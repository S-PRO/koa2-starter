/**
 * Created by alex on 03.05.16.
 */
import Koa from 'koa';
import cors from 'koa-cors';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import convert from 'koa-convert';

import { CatchErrors } from './middlewares';
import { SERVER } from './config/app.config';

import db from './db/models';
import router from './router';

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
    .use(router)
    .listen(SERVER.port);
});
