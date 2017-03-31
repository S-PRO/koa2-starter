import { TokenService, PasswordService } from './../utils/index';
import TOKEN_CONFIG from './../config/token.config';
import db from './../db/models';

export default class Auth {

  static async signIn (email, password) {
    let result;
    const user = await db.user.findOne({ where: { email: email } });
    const passwordValid = await PasswordService.comparePassword(user.password, password);
    const payload = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      status: user.status,
    };
    if (passwordValid) {
      result = Auth.generateToken(payload, TOKEN_CONFIG);
    } else {
      throw new Error();
    }
    return result;
  }

  static async signUp (firstName, lastName, password, email) {
    let result;
    const payload = {
      first_name: firstName,
      last_name: lastName,
      email,
      password: PasswordService.saltHashPassword(password),
    };
    try {
      const user = await db.user.create(payload);
      if (user.status === 'active') {
        result = Auth.generateToken(payload, TOKEN_CONFIG);
      } else {
        result = 'Signup error';
      }
    } catch (e) {
      result = 'Signup error';
    }
    return result;
  }

  static async generateToken (payload, tokenConfig) {
    const accessToken = await TokenService.generate(payload, tokenConfig.accessToken);
    const refreshToken = await TokenService.generate(payload, tokenConfig.refreshToken);
    const token = {
      accessToken: `Bearer ${accessToken}`,
      refreshToken: `Bearer ${refreshToken}`,
    };
    return token;
  }

  static async decodeToken(tokenString) {
    const token = tokenString.replace('Bearer ', '');
    const decode = await TokenService.decode(token, TOKEN_CONFIG.accessToken);
    return decode;
  }

  static async refreshToken (tokenString) {
    let refreshToken;
    const token = tokenString.replace('Bearer ', '');
    const payload = await TokenService.decode(token, TOKEN_CONFIG.accessToken);
    delete payload.iat;
    delete payload.exp;
    if (payload) {
      refreshToken = await Auth.generateToken(payload, TOKEN_CONFIG);
    }
    return refreshToken;
  }

}
