import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import promisify from 'es6-promisify';
import tokenConfig from './../config/token.config';

/*  UNCOMMENT IF YOU USE REDIS TO STORE THERE TOKENS */
// import { createClient, print } from "redis";
// const redis = createClient();
// const redisGetAsync = promisify(redis.get, redis);
// const redisSetexAsync = promisify(redis.setex, redis);

const TOKEN_SECRETE = 'P2y=uf.Keq!/+/RNW7Lu8v?#OOTB';
const signAsync = promisify(jwt.sign, jwt);
const randomBytesAsync = promisify(crypto.randomBytes, crypto);

export default class TokenService {

  static async generateJwtId () {
    try {
      const jti = await randomBytesAsync(32);
      return Promise.resolve(jti.toString('hex'));
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async generate (payload, secret = TOKEN_SECRETE, opts = {}) {
    try {
      const { auth } = tokenConfig;

      const accessTokenId = await TokenService.generateJwtId();
      const refreshTokenId = await TokenService.generateJwtId();

      const accessTokenPayload = Object.assign({}, payload, { jti: accessTokenId });
      const refreshTokenPayload = Object.assign({}, {
        jti: refreshTokenId,
        ati: accessTokenId,
      });

      const refreshTokenOpts = Object.assign({}, {
        expiresIn: auth.refreshTokenTtl,
      }, opts);
      const accessTokenOpts = Object.assign({}, {
        expiresIn: auth.accessTokenTtl,
      }, opts);

      const refreshToken = await signAsync(refreshTokenPayload, secret, refreshTokenOpts);
      const accessToken = await signAsync(accessTokenPayload, secret, accessTokenOpts);
      // await redisSetexAsync(refreshTokenId, auth.refreshTokenTtl, payload.user.username);
      return Promise.resolve({
        accessToken,
        refreshToken,
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
