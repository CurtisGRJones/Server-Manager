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
                            users.first_name, users.last_name, users.verified, users.username
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

    async close() {
        return this.client.end()
    }
}