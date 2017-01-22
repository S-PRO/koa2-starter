import schemas from './schemas';
import validator from './../../utils/reqest-validator';

const validate = validator(schemas);

export default class LoginController {

  @validate
  static async create(ctx, next) {
    ctx.body = { foo: 'bar' };
    await next();
  }

}
