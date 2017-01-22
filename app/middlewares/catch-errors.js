import _debugger from 'debug';

const error = _debugger('koa2-starter:error');

export default async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    error('Catched error: %j', e);
    let payload = e;
    if (e.isBoom) payload = e.output.payload;
    ctx.status = payload.statusCode || payload.status || 500;
    ctx.body = payload;
  }
};
