import {RequestHandler} from "express";
import {Postgres} from "../database/postgres";


export const games: RequestHandler = ( req, res ) => {
    const client = new Postgres()

    client.getGameData().then( games => {
        res.status(200).send(games)
    }).finally( () => {
        client.close()
    })
}