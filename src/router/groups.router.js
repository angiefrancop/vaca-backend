import express from 'express';
import { GroupController } from '../controllers/groups.controller.js';

const groupsRouter = express.Router();
const groupController = GroupController();

groupsRouter.get('/', groupController.getGroups);
groupsRouter.get('/:id', groupController.getGroupById);
groupsRouter.post('/', groupController.createGroup);
groupsRouter.put('/:id', groupController.updateGroup);
groupsRouter.delete('/:id', groupController.deleteGroup);

export default groupsRouter;
