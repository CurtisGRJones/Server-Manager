import { v4 as uuidv4 } from 'uuid';
import { RequestHandler } from "express";
import {Postgres} from "../../database/postgres";
import {checkPassword} from "../../tools/passwords";
import {sleep} from "../../tools/sleep";

export const login: RequestHandler = ( req, res ) => {
    const timeout = sleep(Math.floor(Math.random() * 250) + 250) // To prevent timing attacks
    const user = req.body.user
    const pass = req.body.pass
    const remember = req.body.remember == 'on'
    const client = new Postgres()
    client.getPasswordFromUsername(user).then( (password) => {

        if ( checkPassword(password, pass) ) {
            client.isUserVerified(user).then( ( verified) => {
                if (verified) {
                    timeout.then( () => {
                        // TODO make the cookies more secure
                        // TODO add remember me
                        const cookie = uuidv4()
                        client.saveCookie( cookie, user, remember ).then(() => {
                            res.cookie(
                                'authToken',
                                cookie,
                                {
                                    expires: new Date(Date.now() + 2592000000), // 30 days
                                    secure: true,
                                    httpOnly: true
                                })
                            res.redirect('/home')
                        }).catch((err) => {
                            console.log(err)
                            res.redirect('/500')
                        })
                    })
                } else {
                    timeout.then( () => {
                        res.redirect('/registrationRequested')
                    })
                }
            }).catch((err) => {
                console.log(err)
                res.redirect('/500')
            })
        } else {
            // TODO make this go to a "password failed" page
            res.send('Wrong Password')
        }
    }).catch((err) => {
        console.log(err)
        res.redirect('/500')
    })
}