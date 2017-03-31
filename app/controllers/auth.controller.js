import { Auth } from './../methods/index';

export default class AuthContoller {

  static async signIn (ctx, next) {
    const { request: { body: { email, password } } } = ctx;
    const responce = await Auth.signIn(email, password);
    ctx.body = responce;
    await next();
  }

  static async signUp (ctx, next) {
    const { request: { body: { first_name, last_name, password, email } } } = ctx;
    const responce = await Auth.signUp(first_name, last_name, password, email);
    ctx.body = responce;
    await next();
  }

  static async getUser (ctx, next) {
    const { request: { header: { authorization } } } = ctx;
    let responce;
    if (authorization) {
      const tokenString = authorization;
      responce = await Auth.decodeToken(tokenString);
    } else {
      responce = 'Invalid Token';
    }
    ctx.body = responce;
    await next();
  }

  static async refreshJWTToken (ctx, next) {
    const { request: { body: { refreshToken } } } = ctx;
    const responce = await Auth.refreshToken(refreshToken);
    ctx.body = responce;
    await next();
  }

}
