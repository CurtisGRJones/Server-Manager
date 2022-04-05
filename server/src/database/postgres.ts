import { Client } from 'pg'
import {loginOptions, registerOptions} from "./types";
import {formatPassword} from "../tools/passwords";

export class Postgres {
    client: Client

    connect: Promise<void>

    constructor() {
        this.client = new Client({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            database: process.env.DB_DATABASE
        })
        this.connect = this.client.connect()
    }

    async register(options: registerOptions): Promise<boolean> {
        await this.connect

        await this.client.query(`INSERT INTO users (
            username,
            password,
            email,
            first_name,
            last_name
        ) VALUES (
            $1,
            $2,
            $3,
            $4,
            $5
        )`, [
            options.user,
            formatPassword(options.pass),
            options.email,
            options.firstname,
            options.lastname,
        ])

        return true
    }

    async doesUserExist( user: string ): Promise<boolean> {
        await this.connect

        const queryResults = await this.client.query(
            'SELECT EXISTS(SELECT 1 FROM users WHERE username = $1)',
            [user]
        )

        return queryResults.rows[0].exists
    }

    async isUserVerified( user: string ): Promise<boolean> {
        await this.connect

        const queryResults = await this.client.query(
            'SELECT verified FROM users WHERE username = $1',
            [user]
        )

        return queryResults.rows[0].verified
    }

    async getLoginDataFromUsername(user: string): Promise<any>  {
        await this.connect

        const queryResults = await this.client.query(
            'SELECT password, first_name, last_name FROM users WHERE username = $1',
            [user]
        )

        return queryResults.rows[0]
    }

    async getRegistrationRequests() {
        await this.connect

        const queryResults = await this.client.query(
            `SELECT username, first_name, last_name, email, created_on FROM users WHERE verified = false
            ORDER BY created_on` ,
        )

        return queryResults.rows
    }

    async saveCookie(cookie: string, user: string, remember: boolean = false): Promise<boolean>  {
        await this.connect

        const queryResults = await this.client.query(
            `INSERT INTO loginCookies (
                cookie,
                username,
                remember
            ) VALUES (
                $1,
                $2,
                $3
            )
            ON CONFLICT (username) DO
                UPDATE SET 
                    cookie = $1,
                    remember = $3,
                    expiry = NOW() + INTERVAL '30 DAYS',
                    last_used = NOW()
                WHERE loginCookies.username = $2`,
            [cookie, user, remember]
        )

        return true

    }

    async doesCookieExist( cookie: string ): Promise<boolean> {
        await this.connect

        const queryResults = await this.client.query(
            'SELECT EXISTS(SELECT 1 FROM loginCookies WHERE cookie = $1)',
            [cookie]
        )

        return queryResults.rows[0].exists
    }

    async getCookieInfo(cookie: string): Promise<any> {
        await this.connect

        const queryResults = await this.client.query(
            `SELECT loginCookies.expiry, loginCookies.remember, loginCookies.last_used, 
                            users.verified
                            FROM loginCookies 
                            INNER JOIN users
                            ON loginCookies.username = users.username
                            WHERE cookie = $1`,
            [cookie]
        )

        return queryResults.rows[0]
    }

    async getAccountInfoFromCookies(cookie: string): Promise<any> {
        await this.connect

        const queryResults = await this.client.query(
            `SELECT loginCookies.expiry, loginCookies.remember, loginCookies.last_used, 
                            users.first_name, users.last_name, users.verified, users.username, users.role
                            FROM loginCookies 
                            INNER JOIN users
                            ON loginCookies.username = users.username
                            WHERE cookie = $1`,
            [cookie]
        )

        return queryResults.rows[0]
    }

    async useCookie( cookie: string ): Promise<void> {
        await this.client.query(
            `UPDATE loginCookies
                            SET last_used = NOW()
                            WHERE cookie = $1`,
            [cookie]
        )
    }

    async removeCookie( cookie: string ): Promise<void> {
        await this.client.query(
            `DELETE FROM loginCookies
                            WHERE cookie = $1`,
            [cookie]
        )
    }

    async getGameData(): Promise<any[]> {
        await this.connect

        return (await this.client.query(
            `SELECT games.name, games.image_path, users.username 
            FROM games LEFT JOIN users 
            ON games.added_by = users.username`,
        )).rows
    }

    async getGameDataFiltered( user, game ): Promise<any[]> {
        await this.connect

        game = `%${game}%`
        if ( !user || user.length == 0) {
            return (await this.client.query(
                `SELECT games.name, games.image_path, users.username 
            FROM games LEFT JOIN users 
            ON games.added_by = users.username
            WHERE games.name ILIKE $1`,
                [
                    game
                ]
            )).rows
        } else {
            return (await this.client.query(
                `SELECT games.name, games.image_path, users.username 
            FROM games LEFT JOIN users 
            ON games.added_by = users.username
            WHERE users.username = $1 AND games.name ILIKE $2`,
                [
                    user,
                    game
                ]
            )).rows
        }
    }

    async getGameUsers(): Promise<string[]> {
        await this.connect

        return (await this.client.query(
            `SELECT DISTINCT users.username
            FROM games INNER JOIN users 
            ON games.added_by = users.username`,
        )).rows.map( ( value ) => value.username  )
    }

    async getServerUsers(): Promise<string[]> {
        await this.connect

        return (await this.client.query(
            `SELECT DISTINCT users.username
            FROM servers INNER JOIN users 
            ON servers.added_by = users.username`,
        )).rows.map( ( value ) => value.username  )
    }

    async getServersData(): Promise<any[]> {
        await this.connect

        return (await this.client.query(
            `SELECT servers.id, servers.ip, servers.game, servers.active, users.username 
            FROM servers LEFT JOIN users ON servers.added_by = users.username 
            ORDER BY servers.ip`,
        )).rows
    }

    async getServersDataFiltered(user: string | undefined, ip: string | undefined, game: string | undefined, active: boolean): Promise<any[]> {
        if (ip == undefined) {
            ip = '%'
        } else {
            ip = `%${ip}%`
        }

        if (game == undefined) {
            game = '%'
        } else {
            game = `%${game}%`
        }

        await this.connect
        if (user != undefined && active != undefined) {
            return (await this.client.query(
                `SELECT servers.id, servers.ip, servers.game, servers.active, users.username 
                    FROM servers LEFT JOIN users ON servers.added_by = users.username 
                    WHERE servers.ip ILIKE $1 AND servers.game ILIKE $2 AND users.username = $3 AND servers.active = $4
                    ORDER BY servers.ip`,
                [
                    ip,
                    game,
                    user,
                    active
                ]
            )).rows
        } else if(user) {
            return (await this.client.query(
                `SELECT servers.id, servers.ip, servers.game, servers.active, users.username 
                    FROM servers LEFT JOIN users ON servers.added_by = users.username 
                    WHERE servers.ip ILIKE $1 AND servers.game ILIKE $2 AND users.username = $3
                    ORDER BY servers.ip`,
                [
                    ip,
                    game,
                    user
                ]
            )).rows
        } else if( active != undefined ) {
            return (await this.client.query(
                `SELECT servers.id, servers.ip, servers.game, servers.active, users.username 
                    FROM servers LEFT JOIN users ON servers.added_by = users.username 
                    WHERE servers.ip ILIKE $1 AND servers.game ILIKE $2 AND servers.active = $3
                    ORDER BY servers.ip`,
                [
                    ip,
                    game,
                    active
                ]
            )).rows
        } else {
            return (await this.client.query(
                `SELECT servers.id, servers.ip, servers.game, servers.active, users.username 
                    FROM servers LEFT JOIN users ON servers.added_by = users.username 
                    WHERE servers.ip ILIKE $1 AND servers.game ILIKE $2
                    ORDER BY servers.ip`,
                [
                    ip,
                    game
                ]
            )).rows
        }
    }

    async doesServerExist(server: string): Promise<boolean> {
        await this.connect

        const queryResults = await this.client.query(
            'SELECT EXISTS(SELECT 1 FROM servers WHERE id = $1)',
            [server]
        )

        return queryResults.rows[0].exists
    }

    async setServerActive(id:string, state: boolean): Promise<void> {
        await this.connect

        await this.client.query(
            'UPDATE servers SET active = $1 WHERE id = $2',
            [state, id]
        )
    }

    async close() {
        return this.client.end()
    }
}