import {RequestHandler} from "express";
import {Postgres} from "../database/postgres";


export const gameUsers: RequestHandler = ( req, res ) => {
    const client = new Postgres()

    client.getGameUsers().then( users => {
        res.status(200).send(users)
    }).finally( () => {
        client.close()
    })
}