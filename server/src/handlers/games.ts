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

export const gamesFiltered: RequestHandler = ( req, res ) => {
    const client = new Postgres()

    const filters = req.body

    client.getGameDataFiltered(filters.user || '', filters.game || '' ).then( games => {
        res.status(200).send(games)
    }).finally( () => {
        client.close()
    })
}