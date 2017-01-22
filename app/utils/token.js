/**
 * Created by alex on 03.05.16.
 */

import jwt from 'jsonwebtoken';
import Boom from 'boom';

export const TOKEN_CONFIG = {
  KEY: 'Real!y$!G!..%^$$*&B!g##K)(eY',
  expires: '1y',
  alg: 'HS256',
};

export default class TokenService {
  static async tokenRequired(ctx, next) {
    try {
      const decoded = jwt.verify(ctx.headers.authorization, TOKEN_CONFIG.KEY);
      ctx.user = decoded.user_id;
      await next();
    } catch (e) {
      throw Boom.unauthorized(e);
    }
  }

  static generate(user) {
    return jwt.sign({ user_id: user }, TOKEN_CONFIG.KEY, {
      expiresIn: TOKEN_CONFIG.expires,
      algorithm: TOKEN_CONFIG.alg,
    });
  }
}
