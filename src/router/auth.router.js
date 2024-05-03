import Router from 'express-promise-router';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Controller from '../controllers/auth.controller.js';
import continuator from '../lib/continue.decorator.js';

const AuthRouter = () => {
  const router = Router();
  const controller = Controller();

  router.post('/login', continuator(controller.login));
  router.post('/signup', continuator(controller.signup));
  router.get('/check', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send('You are authenticated');
  });

  return router;
};

export default AuthRouter;
