import {RequestHandler} from "express";

export const authCookies: RequestHandler = ( req, res ) => {
    const user = req.body.authToken

    res.status(200).send({
        auth: true
    })
}