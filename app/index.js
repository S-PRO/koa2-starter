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

import { errors } from './utils/errors';
import * as APP_CONFIG from './config/app.config';

const error = _debugger('koa-example:error');
const debug = _debugger('koa-example:debug');

const app = new Koa();

/**
 * Add basic middleware and run server.
 */
app
  .use(errors)
  .use(convert(cors(APP_CONFIG.CORS)))
  .use(logger())
  .use(convert(bodyParser({ limit: '10mb' })))
  .listen(APP_CONFIG.SERVER.port);

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
