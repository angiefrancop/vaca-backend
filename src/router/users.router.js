import Router from 'express-promise-router';
import Controller from '../controllers/users.controller.js';
import continuator from '../lib/continue.decorator.js';

const UsersRouter = () => {
  const router = Router();
  const controller = Controller();
  router.get('/', continuator(controller.getUsers));
  router.get('/:id', continuator(controller.getUserById));
  router.delete('/:id', continuator(controller.deleteUser));
  router.post('/', continuator(controller.createUser));
  router.put('/:id', continuator(controller.updateUser));

  return router;
};

export default UsersRouter;
