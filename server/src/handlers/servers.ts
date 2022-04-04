import {RequestHandler} from "express";
import {Postgres} from "../database/postgres";
import {authenticated} from "../tools/cookies";

async function getServers (req, res, client) {
    if ( !(await authenticated(req, client, 1)) ) {
        res.status(200).send([])
        return
    } else {
        res.status(200).send(await client.getServersData())
    }
}


export const servers: RequestHandler = ( req, res ) => {
    const client = new Postgres()

    // TODO auth user
    getServers(req, res, client).finally( () => {
        client.close()
    })
}