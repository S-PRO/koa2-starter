import jwt from 'jsonwebtoken';

export default class TokenService {
  /**
   * Generate token from users data
   * @param {Object} - user's data
   * @returns {string} - encoded value, token
   */
  static generate(data, tokenConfig) {
    return jwt.sign(data, tokenConfig.key, {
      expiresIn: tokenConfig.expires,
      algorithm: tokenConfig.alg,
    });
  }

  /**
   * Decode given payload (usually, authorization field from request header)
   * @param {string} - string with token to decore
   * @returns {object|null} - object with users data
   */
  static decode(payload, tokenConfig) {
    try {
      return jwt.verify(payload, tokenConfig.key);
    } catch (e) {
      return null;
    }
  }
}
