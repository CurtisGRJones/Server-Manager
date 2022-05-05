import {RequestHandler} from "express";
import {GetUserData} from "../tools/cookies";
import {Postgres} from "../database/postgres";

// TODO make this auth only
export const getDataFromCookies: RequestHandler = ( req, res ) => {
    const client = new Postgres()
    GetUserData(req, client).then(userData => {
        res.status(200).send(userData)
    }
    ).finally( () => {
        client.close()
    })
}