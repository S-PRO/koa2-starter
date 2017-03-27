import { TokenService, PasswordService } from './../utils/index';
import db from './../db/models';

export default class Auth {

  static async signIn (email, password) {
    let result;
    try {
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
        const token = await TokenService.generate(payload);
        result = `Bearer ${token}`;
      } else {
        throw new Error();
      }
    } catch (e) {
      result = 'Authentication error';
    }
    return result;
  }

  static async signUp (firstName, lastName, password, email) {
    const payload = {
      first_name: firstName,
      last_name: lastName,
      email,
      password: PasswordService.saltHashPassword(password),
    };
    let result;
    try {
      const user = await db.user.create(payload);
      if (user.status === 'active') {
        const token = await TokenService.generate(payload);
        result = `Bearer ${token}`;
      } else {
        result = 'Authentication error';
      }
    } catch (e) {
      result = 'Authentication error';
    }
    return result;
  }

  static async getUser(tokenString) {
    const token = tokenString.replace('Bearer ', '');
    const decode = await TokenService.decode(token);
    return decode;
  }
  //  validate jwt ,checkt expires it or no,
  static async isAuth (tokenString) {
    const token = tokenString.replace('Bearer ', '');
    let result = false;
    try {
      const decodedUser = await Auth.getUser(token);
      const user = await db.user.findOne({ where: { email: decodedUser.email } });
      if (user.password === decodedUser.password) {
        result = true;
      } else {
        result = false;
      }
    } catch (e) {
      result = false;
    }
    return result;
  }

}
