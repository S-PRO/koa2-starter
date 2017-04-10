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
import helmet from 'koa-helmet';

import { CatchErrors } from './middlewares';
import { SERVER } from './config/app.config';

import db from './db/models';
import { publicRoutes, privateRoutes } from './router';

const app = new Koa();

db.sequelize.authenticate().then(() => {
  /*  Add basic middleware and run server.  */
  app
    .use(CatchErrors)
    .use(helmet())// koa-helmet - security headers  middleware
    .use(convert(cors({ origin: true })))
    .use(logger())
    .use(convert(bodyParser({ limit: '10mb' })))
    .use(publicRoutes.routes())
    .use(privateRoutes.routes())
    .listen(SERVER.port);
});

export default app;
