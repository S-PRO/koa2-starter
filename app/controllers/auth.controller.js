import { Auth, File } from './../methods/index';

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
    const { request: { header: { authorization } } } = ctx;
    let responce;
    if (authorization) {
      const tokenString = authorization;
      responce = await Auth.getUser(tokenString);
    } else {
      responce = 'Invalid Token';
    }

    ctx.body = responce;
    await next();
  }

  static async testprivate(ctx, next) {
    ctx.body = 'testprivate';
    await next();
  }

  static async testpublic(ctx, next) {
    ctx.body = 'testpublic';
    await next();
  }

  static async fileUpload(ctx, next) {
    await File.upload(ctx);
    await next();
  }

  static async fileDelete(ctx, next) {
    const { request: { body: { path } } } = ctx;
    await File.delete(path, true);
    await next();
  }

  static async filePath(ctx, next) {
    const { request: { body: { path } } } = ctx;
    ctx.body = await File.path(path);
    await next();
  }

  static async fileExist(ctx, next) {
    const { request: { body: { path } } } = ctx;
    ctx.body = await File.exist(path);
    await next();
  }

}
