import passport from 'koa-passport';
import { Strategy as LocalStrategy } from 'passport-local';
// import bcrypt from 'bcrypt';
import TokenService from './../token.service';
import PasswordService from './../password.service';
import db from './../../db/models';

passport.use(
  new LocalStrategy(
    async (email, password, done) => {
      try {
        const user = await db.user.findOne({ where: { email: email } });
        const passwordValid = await PasswordService.comparePassword(user.password, password);
        // console.log(user);
        if (passwordValid) {
          done(null, { username: user.first_name, verified: 'true' }, { message: 'Success' });
          // console.log('here');
        } else {
          done(null, false, { message: 'Authentication err.' });
        }
      } catch (e) {
        done(null, false, { message: 'Authentication err.' });
      }
    },
  ),
);

export const LocalAuth = (ctx, next) => {
  return passport.authenticate(
    'local', async (err, user, info) => {
      if (user === false) {
        ctx.status = 401;
        ctx.body = info.message;
      } else {
        try {
          const { accessToken, refreshToken } = await TokenService.generate({ user });
          ctx.body = {
            accessToken,
            refreshToken,
          };
        } catch (e) {
          ctx.throw(500, e);
        }
      }
    },
  )(ctx, next);
};

export default passport;
