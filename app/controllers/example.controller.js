import { File } from './../methods/index';

export default class ExampleContoller {

  static async testprivate(ctx, next) {
    const responce = {};
    responce.text = 'private route';
    ctx.body = responce;
    await next();
  }

  static async testpublic(ctx, next) {
    const responce = {};
    responce.text = 'public route';
    ctx.body = responce;
    await next();
  }

  static async fileUpload(ctx, next) {
    await File.upload(ctx);
    const responce = {};
    responce.upload = true;
    ctx.body = responce;
    await next();
  }

  static async fileDelete(ctx, next) {
    const { request: { body: { path } } } = ctx;
    await File.delete(path, true);
    await next();
  }

  static async filePath(ctx, next) {
    const { path } = ctx.params;
    const responce = {};
    responce.path = await File.path(path);
    ctx.body = responce;
    await next();
  }

  static async fileExist(ctx, next) {
    const { path } = ctx.params;
    const responce = {};
    responce.exist = await File.exist(path);
    ctx.body = responce;
    await next();
  }

}
