import { Auth } from './../modules/index';

export default async (ctx, next) => {
  const token = ctx.request.header.authorization;
  const isAuth = await Auth.isAuth(token);
  if (isAuth) {
    await next();
  } else {
    ctx.body = 'Authentication error';
  }
};
