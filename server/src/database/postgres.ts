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

    async isUserVerified( user: string ): Promise<boolean> {
        await this.connect

        const queryResults = await this.client.query(
            'SELECT verified FROM users WHERE username = $1',
            [user]
        )

        return queryResults.rows[0].verified
    }

    async getPasswordFromUsername(user: string): Promise<string>  {
        await this.connect

        const queryResults = await this.client.query(
            'SELECT password FROM users WHERE username = $1',
            [user]
        )

        return queryResults.rows[0].password

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
}