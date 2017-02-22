import { Api as api, BaseController } from './../../utils';

import { RequireValidate } from './../../middlewares';
import { loginSchema } from './schemas';

@api.base('/auth')
class AuthController extends BaseController {

  @api.post('/login', [RequireValidate(loginSchema)])
  static async login(ctx, next) {
    ctx.body = { foo: 'bar' };
    await next();
  }
}

export default new AuthController();
