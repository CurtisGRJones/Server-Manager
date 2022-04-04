import {RequestHandler} from "express";
import {deleteCookie} from "../tools/cookies";

export const logout: RequestHandler = ( req, res ) => {
    deleteCookie(req).then( () => {
        res.status(200).send({
            success: true,
            statusCode: 200
        })
    })
}