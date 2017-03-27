import passport from 'koa-passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
 import TokenService from './../token.service';
// import tokenConfig from './../../config/token.config';
import PasswordService from './../password.service';
import db from './../../db/models';

// const TOKEN_SECRETE = tokenConfig.secret;
// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;

// const jwtOptions = {
//   jwtFromRequest: ExtractJwt.fromAuthHeader(),
//   secretOrKey: TOKEN_SECRETE,
// };

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
  },
    async (email, password, done) => {
      try {
        const user = await db.user.findOne({ where: { email: email } });
        const passwordValid = await PasswordService.comparePassword(user.password, password);
        if (passwordValid) {
          done(null, { user: user, verified: 'true' }, { message: 'Success' });
        } else {
          done(null, false, { message: 'Authentication err.' });
        }
      } catch (e) {
        done(null, false, { message: 'Authentication err.' });
      }
    },
  ),
);

// passport.use(new JwtStrategy(jwtOptions,
//     async (payload, done) => {
//       try {
//         const user = await db.user.findOne({ where: { id: payload.id }, attributes: { exclude: ['password'] } });
//         if (user) {
//           done(null, user);
//         }
//       } catch (e) {
//         done(null, false, { message: 'Authentication err.' });
//       }
//     },
//   ),
// );

export const LocalAuth = (ctx, next) => {
  return passport.authenticate(
    'local', async (err, user, info) => {
      if (user === false) {
        ctx.status = 401;
        ctx.body = info.message;
      } else {
        try {
          const payload = {
            id: user.id,
            email: user.email,
          };
          // const { accessToken, refreshToken } = await TokenService.generate(payload);
          // ctx.body = {
          //   accessToken,
          //   refreshToken,
          // };
          // const token = jwt.sign(payload, TOKEN_SECRETE); //здесь создается JWT
          // ctx.body = {user: user.displayName, token: 'JWT ' + token};
          const token = await TokenService.generate(payload);
          console.log(token)
          const data = await TokenService.decode(token);
          console.log(data)
        } catch (e) {
          ctx.throw(500, e);
        }
      }
    },
  )(ctx, next);
};

export default passport;
