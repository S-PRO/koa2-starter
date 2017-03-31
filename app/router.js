import Router from 'koa-router';
import jwt from 'koa-jwt';
import UserController from './controllers/user.controller';
import AuthContoller from './controllers/auth.controller';
import ExampleContoller from './controllers/example.controller';
import { AuthMiddleware } from './middlewares/index';
import tokenConfig from './config/token.config';

const TOKEN_SECRET = tokenConfig.accessToken.key;
const publicRouter = new Router();
const privateRouter = new Router();

publicRouter
/*  Public Routes */
  //  user

  .post('/auth/signin', AuthContoller.signIn)
  .post('/auth/signup', AuthContoller.signUp)
  .post('/auth/refreshtoken', AuthContoller.refreshJWTToken)
  .post('/auth/getuser', AuthContoller.getUser)
  // example controller show work of custom methods
  .post('/file/upload', ExampleContoller.fileUpload)
  .post('/file/delete', ExampleContoller.fileDelete)
  .post('/file/exist', ExampleContoller.fileExist)
  .post('/file/fullpath', ExampleContoller.filePath)
  .get('/testpublic', ExampleContoller.testpublic);
privateRouter
/*  Protected Routes  */
  //  auth

  .use(jwt({ secret: TOKEN_SECRET }))
  .use(AuthMiddleware)
  .get('/testprivate', ExampleContoller.testprivate)
  .post('/user', UserController.create)
  .get('/user', UserController.fetchAll)
  .get('/user/:id', UserController.fetchOne)
  .put('/user/:id', UserController.update)
  .delete('/user/:id', UserController.remove);


export { publicRouter, privateRouter };
