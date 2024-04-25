import Router from 'express-promise-router';
import Controller from '../controllers/groups.controller.js';
import continuator from '../lib/continue.decorator.js';

const GroupsRouter = () => {
  console.log('GroupsRouter');
  const router = Router();
  const controller = Controller();

  router.get('/', continuator(controller.getGroups));
  router.get('/:id', continuator(controller.getGroupById));
  // router.delete('/:id', continuator(controller.deleteById));
  // router.post('/', continuator(controller.create));
  // router.put('/:id', continuator(controller.fullUpdateById));

  return router;
};

export default GroupsRouter;
