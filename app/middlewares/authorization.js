import { Auth } from './../methods/index';

export default async (ctx, next) => {
  const token = ctx.request.header.authorization;
  let isAuth;// should be true/false
  if (token) {
    isAuth = await Auth.decodeToken(token);
  }
  if (isAuth) {
    await next();
  } else {
    ctx.body = 'Authentication error';
  }
};
