import Router from 'koa-router';
import jwt from 'koa-jwt';
import UserController from './controllers/user.controller';
import AuthContoller from './controllers/auth.controller';
import { AuthMiddleware } from './middlewares/index';
import tokenConfig from './config/token.config';

const publicRouter = new Router();
const privateRouter = new Router();

publicRouter
/*  Public Routes */
  //  user
  .post('/getuser', AuthContoller.getUser)
  .post('/signin', AuthContoller.signIn)
  .post('/signup', AuthContoller.signUp)
  .get('/testpublic', AuthContoller.testpublic);
privateRouter
/*  Protected Routes  */
  //  auth
  .use(jwt({ secret: tokenConfig.secret }))
  .use(AuthMiddleware)
  .get('/testprivate', AuthContoller.testprivate)
  .post('/user', UserController.create)
  .get('/user', UserController.fetchAll)
  .get('/user/:id', UserController.fetchOne)
  .put('/user/:id', UserController.update)
  .delete('/user/:id', UserController.remove);


export { publicRouter, privateRouter };
