import { Auth } from './../modules/index';

export default class AuthContoller {

  static async signIn(ctx, next) {
    const { request: { body: { email, password } } } = ctx;
    const responce = await Auth.signIn(email, password);
    ctx.body = responce;
    await next();
  }

  static async signUp(ctx, next) {
    const { request: { body: { first_name, last_name, password, email } } } = ctx;
    const responce = await Auth.signUp(first_name, last_name, password, email);
    ctx.body = responce;
    await next();
  }

  static async getUser(ctx, next) {
    const { request: { body: { token } } } = ctx;
    const responce = await Auth.getUser(token);
    ctx.body = responce;
    await next();
  }

  static async testprivate(ctx, next) {
    ctx.body = 'testprivate';
    await next();
  }

}
