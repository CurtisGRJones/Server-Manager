import { RequestHandler } from "express";
import {Postgres} from "../database/postgres";

export const register: RequestHandler = ( req, res ) => {
    const client = new Postgres()
    // TODO check username is unique and fits parameters
    client.register(req.body).then(() => {
        res.redirect('/registrationRequested')
    }).catch(() => {
        res.redirect('/500')
    }).finally( () => {
        client.close()
    })
}