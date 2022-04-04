import {RequestHandler} from "express";
import {Postgres} from "../database/postgres";
import {authenticated} from "../tools/cookies";


export const servers: RequestHandler = ( req, res ) => {
    const client = new Postgres()

    // TODO auth user

    authenticated(req, client, 1).then( verified => {
        if ( !verified ) {
            res.status(200).send([])
            return
        } else {
            client.getServersData().then( servers => {
                res.status(200).send(servers)
            })
        }
    }).finally( () => {
        client.close()
    })


}