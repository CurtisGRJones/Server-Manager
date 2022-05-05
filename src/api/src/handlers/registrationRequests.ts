import {RequestHandler} from "express";
import {Postgres} from "../database/postgres";
import {authenticated} from "../tools/cookies";
import {notAuthorized} from "../tools/404";

async function getRegistrationRequests( req, res, client: Postgres ) {

    if (!(await authenticated(req, client, 1)) ) {
        notAuthorized(res)
        return
    } else {
        res.status(200).send( await client.getRegistrationRequests() )
    }
}

export const registrationRequests: RequestHandler = ( req, res ) => {
    const client = new Postgres()

    getRegistrationRequests(req, res, client).finally( () => {
        client.close()
    } )


}