import { createSchema } from './schemas';
import { validator, PasswordService } from './../../utils';
import db from './../../models';

export default class LoginController {

  @validator(createSchema)
  static async create(ctx, next) {
    const { request: { body: { first_name, last_name, password, email } } } = ctx;
    const userData = {
      first_name,
      last_name,
      email,
      password: PasswordService.saltHashPassword(password),
    };

    const user = await db.user.create(userData);
    ctx.body = user;
    await next();
  }

  static async update(ctx, next) {
    ctx.body = { foo: 'bar' };
    await next();
  }

}
