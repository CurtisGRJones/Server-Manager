import {RequestHandler} from "express";
import {isAuthorizedCookies} from "../tools/cookies";
import {Postgres} from "../database/postgres";

export const authCookies: RequestHandler = ( req, res ) => {
    const client = new Postgres()
    isAuthorizedCookies(req, client).then(userData => {
        res.status(200).send(userData)
    }
    ).finally( () => {
        client.close()
    })

}