import { Auth } from './../methods/index';

export default async (ctx, next) => {
  try {
    const token = ctx.request.header.authorization;
    let isAuth;// should be true/false
    if (token) {
      isAuth = await Auth.isAuth(token);
    }
    if (isAuth) {
      await next();
    } else {
      ctx.body = 'Authentication error';
    }
  } catch (e) {
    ctx.body = 'Authentication error';
  }
};
