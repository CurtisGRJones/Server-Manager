import {RequestHandler} from "express";
import {Postgres} from "../database/postgres";


export const serverUsers: RequestHandler = ( req, res ) => {
    const client = new Postgres()

    client.getServerUsers().then( users => {
        res.status(200).send(users)
    }).finally( () => {
        client.close()
    })
}