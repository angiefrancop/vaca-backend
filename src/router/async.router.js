import Router from 'express-promise-router';
import groupRouter from './groups.router.js';
import usersRouter from './users.router.js';
import authRouter from './auth.router.js';
import { connectDatabase, commitDatabase, rollbackDatabase } from '../lib/database.middleware.js';

const AsyncRouter = () => {
  const router = Router();

  router.use(connectDatabase);
  router.use('/auth', authRouter());
  router.use('/users', usersRouter());
  router.use('/groups', groupRouter());
  router.use(commitDatabase);
  router.use(rollbackDatabase);

  return router;
};

export default AsyncRouter;
