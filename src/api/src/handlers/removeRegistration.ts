import {RequestHandler} from "express";
import {Postgres} from "../database/postgres";
import {authenticated} from "../tools/cookies";
import {notAuthorized} from "../tools/404";

async function removeRegistrationHandler (req, res, client: Postgres) {
    const user = req.body.user
    if ( !(await authenticated(req, client, 1)) ) {
        notAuthorized(res)
        return
    } else {
        await client.removeRegistration(user)
        res.status(200).send({
            statusCode: 200,
            success: true
        })
    }
}


export const removeRegistration: RequestHandler = ( req, res ) => {
    const client = new Postgres()

    removeRegistrationHandler(req, res, client).finally( () => {
        client.close()
    })
}