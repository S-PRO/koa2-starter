import { File } from './../methods/index';

export default class ExampleContoller {

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
