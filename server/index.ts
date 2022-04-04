import * as express from 'express'
import * as bodyParser from 'body-parser'
import {login} from "./src/handlers/login";
import {register} from "./src/handlers/register";
import {authCookies} from "./src/handlers/auth";
import * as cookieParser from "cookie-parser";
import {getDataFromCookies} from "./src/handlers/userData";
import {logout} from "./src/handlers/logout";
import {games} from "./src/handlers/games";
import {servers} from "./src/handlers/servers";

require('dotenv').config()

const port = 8080

const app = express()
app.use( bodyParser.json() )
app.use( express.urlencoded( { extended: false } ) )
app.use(cookieParser())

// API

app.post( '/api/login',  login)
app.get( '/api/logout',  logout)

app.post( '/api/register',  register)

app.get( '/api/auth', authCookies )

app.get( '/api/user-data', getDataFromCookies )

app.get( '/api/games', games)

app.get( '/api/servers', servers)

app.get( '/api', ( req, res ) => {
    res.send( 'API works' )
} )

app.listen( port, () => {
    console.log( `Server listening on the port::${port}` )
} )