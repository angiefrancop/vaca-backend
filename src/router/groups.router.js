import express from 'express';
import groupsController from '../controllers/groups.controller.js';

const groupsRouter = express.Router();

groupsRouter.get('/', groupsController.getGroups);
groupsRouter.get('/:id', groupsController.getGroupById);
groupsRouter.post('/', groupsController.createGroup);
groupsRouter.put('/:id', groupsController.updateGroup);
groupsRouter.delete('/:id', groupsController.deleteGroup);

export default groupsRouter;
