import {RequestHandler} from "express";
import {GetUserData} from "../tools/cookies";

// TODO make this auth only
export const getDataFromCookies: RequestHandler = ( req, res ) => {
    GetUserData(req).then( userData => {
            res.status(200).send(userData)
        }
    )

}