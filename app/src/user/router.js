import Router from 'koa-router';

import UserController from './user.controller';

const OPTIONS = {
  prefix: '/user',
};

const router = new Router(OPTIONS);

router
  .post('/', UserController.create)
  .put('/:id', UserController.update);

export default router.routes();
