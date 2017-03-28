import fs from 'fs';
import _debugger from 'debug';

const error = _debugger('koa2-starter:error');
const debug = _debugger('koa2-starter:debug');

const loadModules = () => {
  fs.readdirSync(`${__dirname}/src`)
    .forEach((mod) => {
      try {
        app.use(require(`${__dirname}/src/${mod}/router.js`).default) // eslint-disable-line
        debug(`loaded: '${mod}' module.`);
      } catch (e) {
        error(`Error, while loading ${mod}`, e);
      }
    });
};

export default loadModules;
