import {Postgres} from "../database/postgres";

type UserData = {
    authorized: boolean,
    username?: string,
    firstName?: string,
    lastName?: string
}

function authorized(row): UserData {
    return {
        authorized: true,
        username: row.username,
        firstName: row.first_name,
        lastName: row.last_name
    }
}

function notAuthorized(): UserData {
    return { authorized: false }
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
            return authorized(row)
        } else {
            await client.removeCookie(cookie)
            return notAuthorized()
        }
    }

    return authorized(row)
}