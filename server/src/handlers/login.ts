import { v4 as uuidv4 } from 'uuid';
import { RequestHandler } from "express";
import {Postgres} from "../database/postgres";
import {checkPassword} from "../tools/passwords";
import {sleep} from "../tools/sleep";

type ResponseOptions = {
    statusCode: number,
    authenticated?: boolean,
    userData?: {
        firstName: string,
        lastName: string
    }
    redirect?: string,
    authToken?: {
        value: string,
        expires: string
    }
}

const auth = async (user: string, pass: string, remember: boolean): Promise<ResponseOptions> => {
    const client = new Postgres()

    const timeout = sleep(Math.floor(Math.random() * 250) + 250) // To prevent timing attacks

    const exists = await client.doesUserExist(user)
    if (!exists) {
        return {
            statusCode: 200,
            authenticated: false,
        }
    }

    const userData = await client.getLoginDataFromUsername(user)
    const password = userData.password
    if (!checkPassword(password, pass)) {
        await timeout
        return {
            statusCode: 200,
            authenticated: false,
        }
    }

    const verified = client.isUserVerified(user)
    if (!verified) {
        return {
            statusCode: 200,
            authenticated: true,
            redirect: '/registrationRequested'
        }
    }

    // TODO make the cookies more secure
    const cookie = uuidv4()
    await client.saveCookie( cookie, user, remember )
    return {
        statusCode: 200,
        authenticated: true,
        authToken: {
            value: cookie,
            expires: new Date(Date.now() + 2592000000).toUTCString()
        },
        userData: {
            firstName: userData.first_name,
            lastName: userData.last_name
        },
        redirect: '/home'
    }
}

export const login: RequestHandler = ( req, res ) => {
    const user = req.body.user
    const pass = req.body.pass
    const remember = req.body.remember == 'on'

    auth( user, pass, remember ).then( response => {
        res.status(response.statusCode).send(response)
    } ).catch( err => {
        res.status(500).send({
            message: '500 Internal Server error',
            err
        })
    })
}