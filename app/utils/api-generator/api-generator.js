import Router from 'koa-router';

function route(...args) {
  const [path, method, middlewares] = args;
  return (target, key, descriptor) => {
    if (!path) throw new Error('Route should have at least "path" argument!');

    if (!target.prototype.router) target.prototype.router = new Router();

    if (args.length === 1) {
      target.prototype.router.prefix(path);
    } else {
      target.prototype.router[method](path, ...middlewares, descriptor.value);
    }
    return descriptor;
  };
}

export function base(path) {
  return route(path);
}

export function get(path = '*', middlewares = []) {
  return route(path, 'get', middlewares);
}

export function post(path = '*', middlewares = []) {
  return route(path, 'post', middlewares);
}

export function put(path = '*', middlewares = []) {
  return route(path, 'put', middlewares);
}

export function del(path = '*', middlewares = []) {
  return route(path, 'delete', middlewares);
}

export function patch(path = '*', middlewares = []) {
  return route(path, 'patch', middlewares);
}

export function options(path = '*', middlewares = []) {
  return route(path, 'options', middlewares);
}

export function head(path = '*', middlewares = []) {
  return route(path, 'head', middlewares);
}

export function use(path = '*') {
  return route(path, 'use');
}

export function all(path = '*', middlewares = []) {
  return route(path, 'all', middlewares);
}
