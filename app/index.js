/**
 * Created by alex on 03.05.16.
 */
import fs from 'fs';
import _debugger from 'debug';

import Koa from 'koa';
import cors from 'koa-cors';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import convert from 'koa-convert';
import { CatchErrors } from './middlewares';
import { SERVER } from './config/app.config';

import { SocketService } from './utils/index';

import db from './models';

import HTTP_SERVER  from 'http';
import IO  from 'socket.io';


const error = _debugger('koa2-starter:error');
const debug = _debugger('koa2-starter:debug');
const app = new Koa();
const server = new  HTTP_SERVER.createServer(app.callback());
const io = new IO(server);

db.sequelize.authenticate().then(() => {

    io.on('connection', function(socket){
        SocketService(socket,io);
    });


    /**
     * Add basic middleware and run server.
     */
    app
        .use(CatchErrors)
        .use(convert(cors({ origin: true })))
        .use(logger())
        .use(convert(bodyParser({ limit: '10mb' })));



    /**
     * Init all routes.
     */
    fs.readdirSync(`${__dirname}/src`)
        .forEach((mod) => {
            try {
                app.use(require(`${__dirname}/src/${mod}/router.js`).default) // eslint-disable-line
                debug(`loaded: '${mod}' module.`);
            } catch (e) {
                error(`Error, while loading ${mod}`, e);
            }
        });

    server.listen(3000);

});
