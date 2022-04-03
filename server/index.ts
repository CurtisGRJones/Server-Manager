import * as express from 'express'
import * as bodyParser from 'body-parser'
import {login} from "./src/handlers/login/login";
import {register} from "./src/handlers/register/register";

require('dotenv').config()

const port = 8080

// const angularPath = process.cwd()+"/../app/dist/app/"

const app = express()
app.use( bodyParser.json() )
app.use( express.urlencoded( { extended: false } ) )

// API

app.post( '/api/login',  login)

app.post( '/api/register',  register)

app.get( '/api', ( req, res ) => {
    res.send( 'API works' )
} )

app.listen( port, () => {
    console.log( `Server listening on the port::${port}` )
} )