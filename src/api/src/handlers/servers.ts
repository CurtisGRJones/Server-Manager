import {RequestHandler} from "express";
import {Postgres} from "../database/postgres";
import {authenticated} from "../tools/cookies";
import {notAuthorized} from "../tools/404";

async function getServers (req, res, client: Postgres) {
    if ( !(await authenticated(req, client, 1)) ) {
        notAuthorized(res)
        return
    } else {
        res.status(200).send(await client.getServersData())
    }
}


export const servers: RequestHandler = ( req, res ) => {
    const client = new Postgres()

    getServers(req, res, client).finally( () => {
        client.close()
    })
}

async function getServersFiltered (req, res, client: Postgres) {
    if ( !(await authenticated(req, client, 1)) ) {
        notAuthorized(res)
        return
    } else {
        const data = req.body
        res.status(200).send(await client.getServersDataFiltered(data.user, data.ip, data.game, data.active))
    }
}

export const serversFiltered: RequestHandler = ( req, res ) => {
    const client = new Postgres()

    getServersFiltered(req, res, client).finally( () => {
        client.close()
    })
}