import { createSchema } from './schemas';
import { validator } from './../../utils';

export default class LoginController {

  @validator(createSchema)
  static async create(ctx, next) {
    ctx.body = { foo: 'bar' };
    await next();
  }

}
