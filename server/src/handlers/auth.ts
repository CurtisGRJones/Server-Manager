import {RequestHandler} from "express";
import {isAuthorizedCookies} from "../tools/cookies";

export const authCookies: RequestHandler = ( req, res ) => {
    isAuthorizedCookies(req).then( userData => {
            res.status(200).send(userData)
        }
    )

}