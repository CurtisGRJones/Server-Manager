import {RequestHandler} from "express";
import {authenticated} from "../tools/cookies";
import {notAuthorized} from "../tools/404";
import {Postgres} from "../database/postgres";

async function stopServer (req, res, client: Postgres) {
    const server = req.body.id

    if ( !server ||
        !(await client.doesServerExist(server)) ||
        !(await authenticated(req, client, 1)) ) {
        notAuthorized(res)
        return
    } else {
        await client.setServerActive(server, false)
        res.status(200).send( { success: true } )
    }
}

export const stop: RequestHandler = ( req, res ) => {
    const client = new Postgres()

    stopServer(req, res, client).finally( () => {
        client.close()
    })
}