import * as express from 'express'
import * as bodyParser from 'body-parser'
import {login} from "./src/handlers/login";
import {register} from "./src/handlers/register";
import {authCookies} from "./src/handlers/auth";
import * as cookieParser from "cookie-parser";
import {getDataFromCookies} from "./src/handlers/userData";
import {logout} from "./src/handlers/logout";
import {games, gamesFiltered} from "./src/handlers/games";
import {servers, serversFiltered} from "./src/handlers/servers";
import {start} from "./src/handlers/start";
import {stop} from "./src/handlers/stop";
import {gameUsers} from "./src/handlers/gameUsers";
import {serverUsers} from "./src/handlers/serverUsers";
import {registrationRequests} from "./src/handlers/registrationRequests";
import {acceptRegistration} from "./src/handlers/acceptRegistration";
import {removeRegistration} from "./src/handlers/removeRegistration";

require('dotenv').config()

const port = 8000

const app = express()
app.use( bodyParser.json() )
app.use( express.urlencoded( { extended: false } ) )
app.use(cookieParser())

// API

app.post( '/api/login',  login)
app.get( '/api/logout',  logout)

app.post( '/api/register',  register)
app.get('/api/registrationRequests', registrationRequests)
app.post( '/api/acceptRegistration', acceptRegistration )
app.post( '/api/removeRegistration', removeRegistration )

app.get( '/api/auth', authCookies )

app.get( '/api/user-data', getDataFromCookies )

app.get( '/api/games', games)
app.post( '/api/games', gamesFiltered)
app.get( '/api/gameUsers', gameUsers )

app.get( '/api/servers', servers)
app.post( '/api/servers', serversFiltered)
app.get( '/api/serverUsers', serverUsers)

app.post( '/api/servers/start', start)
app.post( '/api/servers/stop', stop)

app.get( '/api', ( req, res ) => {
    res.send( 'API works' )
} )

app.listen( port, () => {
    console.log( `Server listening on the port::${port}` )
} )