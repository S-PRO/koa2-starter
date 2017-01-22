import Router from 'koa-router';

import UserController from './user.controller';

const OPTIONS = {
  prefix: '/user',
};

const router = new Router(OPTIONS);

router
  .post('/', UserController.create)
  .post('/:id', UserController.create);

export default router.routes();
