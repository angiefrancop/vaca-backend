import Router from 'express-promise-router';
import Controller from '../controllers/groups.controller.js';
import continuator from '../lib/continue.decorator.js';

const GroupsRouter = () => {
  const router = Router();
  const controller = Controller();

  router.get('/', continuator(controller.getGroups));
  router.get('/:id', continuator(controller.getGroupById));
  router.delete('/:id', continuator(controller.deleteGroup));
  router.post('/', continuator(controller.createGroup));
  router.put('/:id', continuator(controller.updateGroup));

  return router;
};

export default GroupsRouter;
