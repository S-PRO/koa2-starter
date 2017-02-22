import Boom from 'boom';

export default async (ctx, next) => {
  if (ctx.request.body.email !== 'foo@bar.com') throw Boom.forbidden('You are not authorized!');
  await next();
};
