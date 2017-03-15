import { LocalAuth } from './../utils/';

export default class AuthContoller {

  static async signIn(ctx, next) {
    await LocalAuth(ctx, next);
    await next();
  }

}
