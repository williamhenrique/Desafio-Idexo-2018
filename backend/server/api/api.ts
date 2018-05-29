import * as express from 'express';
import {Application} from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import {AuthConfig, FbAuth} from '../auth';
import Routes from './routes/routes';
import * as cors from 'cors';
const config = require('../config/env/config')();
const session = require('express-session');

class Api{
    public auth: any;
    public authFacebook: any;
    public express: any;    

    constructor(){
        this.express = express();
        this.auth = AuthConfig();
        this.authFacebook = FbAuth();    
        this.middleware()
        this.routes(this.express, this.auth, this.authFacebook);
    }

    middleware(){
        this.express.use(cors())
        this.express.use(morgan('dev'))
        this.express.use(bodyParser.urlencoded({extended: true}))
        this.express.use(bodyParser.json())
        this.express.use(this.auth.initialize());
        this.express.use(this.authFacebook.initialize());
        this.express.use(session({
            secret: config.secret,
        }));
    }

    private routes(app: express.Application, auth: any, authFacebook: any){
        new Routes(app, auth, authFacebook);
    }
}

export default new Api().express