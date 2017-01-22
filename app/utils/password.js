/**
 * Created by alex on 03.05.16.
 */

import crypto from 'crypto';

const CONFIG = {
  SECRET: 'Some!SeCREtt321KEy..142q',
  METHOD: 'sha256',
};

export default class PasswordService {
  static crypt(str) {
    return crypto.createHmac(CONFIG.METHOD, CONFIG.SECRET)
      .update(str)
      .digest('hex');
  }

  static compare(str, hash) {
    return this.crypt(str) === hash;
  }
}
