import Router from 'koa-router';

import UserController from './controllers/user.controller';
import AuthContoller from './controllers/auth.controller';

const router = new Router();

router
  //  user
  .post('/user', UserController.create)
  .get('/user', UserController.fetchAll)
  .get('/user/:id', UserController.fetchOne)
  .put('/user/:id', UserController.update)
  .delete('/user/:id', UserController.remove)
  //  auth
  .post('/signin', AuthContoller.signIn);
export default router.routes();
