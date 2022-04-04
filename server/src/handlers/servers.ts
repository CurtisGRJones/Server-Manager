import {RequestHandler} from "express";
import {Postgres} from "../database/postgres";


export const servers: RequestHandler = ( req, res ) => {
    const client = new Postgres()

    // TODO auth user

    client.getServersData().then( servers => {
        res.status(200).send(servers)
    }).finally( () => {
        client.close()
    })
}