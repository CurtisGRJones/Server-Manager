import {RequestHandler} from "express";
import {deleteCookie} from "../tools/cookies";
import {Postgres} from "../database/postgres";

export const logout: RequestHandler = ( req, res ) => {
    const client = new Postgres()
    deleteCookie(req, client).then(() => {
        res.status(200).send({
            success: true,
            statusCode: 200
        })
    }).finally( () => {
        client.close()
    })
}