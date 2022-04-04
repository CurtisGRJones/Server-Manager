import {Postgres} from "../database/postgres";

type UserData = {
    statusCode: number
    authorized: boolean,
    username?: string,
    firstName?: string,
    lastName?: string
}

function authorized(): UserData {
    return {
        statusCode: 200,
        authorized: true,
    }
}

function userData(row): UserData {
    return {
        statusCode: 200,
        authorized: true,
        username: row.username,
        firstName: row.first_name,
        lastName: row.last_name
    }
}

function notAuthorized(): UserData {
    return {
        statusCode: 200,
        authorized: false
    }
}

export async function isAuthorizedCookies(req): Promise<UserData> {
    const cookie = req.cookies.authToken

    if( !cookie ) {
        return notAuthorized()
    }

    const client = new Postgres()

    if ( ! await client.doesCookieExist( cookie ) ) {
        return notAuthorized()
    }

    const row = await client.getCookieInfo( cookie )

    if ( ! row.verified ) {
        return notAuthorized()
    }

    if ( !row.remember || row.expiry < Date() ) {
        if ( row.last_used < new Date(Date() + 300000)) { // 5 minutes
            await client.useCookie(cookie)
            return authorized()
        } else {
            await client.removeCookie(cookie)
            return notAuthorized()
        }
    }

    return authorized()
}

export async function GetUserData( req ): Promise<UserData> {
    const cookie = req.cookies.authToken

    if( !cookie ) {
        return notAuthorized()
    }

    const client = new Postgres()

    if ( ! await client.doesCookieExist( cookie ) ) {
        return notAuthorized()
    }

    const row = await client.getAccountInfoFromCookies( cookie )

    if ( ! row.verified ) {
        return notAuthorized()
    }

    if ( !row.remember || row.expiry < Date() ) {
        if ( row.last_used < new Date(Date() + 300000)) { // 5 minutes
            await client.useCookie(cookie)
            return userData(row)
        } else {
            await client.removeCookie(cookie)
            return notAuthorized()
        }
    }

    return userData(row)
}

export async function deleteCookie(req): Promise<void> {
    const cookie = req.cookies.authToken

    const client = new Postgres()

    return client.removeCookie(cookie)
}