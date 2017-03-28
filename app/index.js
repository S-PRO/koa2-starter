/**
 * Created by alex on 03.05.16.
 */
 /**
  * backup
  */

import Koa from 'koa';
import cors from 'koa-cors';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import convert from 'koa-convert';
import passport from 'koa-passport';

import { CatchErrors } from './middlewares';
import { SERVER } from './config/app.config';

import db from './db/models';
import { publicRouter, privateRouter } from './router';

const app = new Koa();

db.sequelize.authenticate().then(() => {
  /**
   * Add basic middleware and run server.
   */
  app
    .use(CatchErrors)
    .use(convert(cors({ origin: true })))
    .use(logger())
    .use(convert(bodyParser({ limit: '10mb' })))
    .use(passport.initialize())
    .use(passport.session())
    .use(publicRouter.routes())
    .use(privateRouter.routes())
    .listen(SERVER.port);
});

export default app;
