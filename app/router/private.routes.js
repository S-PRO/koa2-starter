import Router from 'koa-router';
import jwt from 'koa-jwt';

import UserController from './../controllers/user.controller';
import ExampleContoller from './../controllers/example.controller';
import AuthContoller from './../controllers/auth.controller';

import { AuthMiddleware } from './../middlewares/index';
import tokenConfig from './../config/token.config';

const TOKEN_SECRET = tokenConfig.accessToken.key;
const privateRouter = new Router();

privateRouter
  /*
    JWT Token check middlewares
  */
  .use(jwt({ secret: TOKEN_SECRET }))
  .use(AuthMiddleware)
  /*
    Get jwt token payload
  */
  .post('/auth/token/payload', AuthContoller.tokenPayload)
  /*
    CRUD operation with user
  */
  .post('/user', UserController.create)
  .get('/user', UserController.fetchAll)
  .get('/user/:id', UserController.fetchOne)
  .put('/user/:id', UserController.update)
  .delete('/user/:id', UserController.remove)
  /*
    simple example of access to private route
  */
  .get('/private/route', ExampleContoller.testprivate);

export default privateRouter;
