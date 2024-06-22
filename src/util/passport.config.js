import passport from 'passport';
import pool from '../lib/db.pool.js';
import { ExtractJwt, Strategy } from 'passport-jwt';
import Repository from '../repositories/users.repository.js';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(
  new Strategy(options, async function (jwt_payload, done) {
    let dbCliente;
    try {
      dbCliente = await pool.connect();
      const user = await Repository(dbCliente).getUserById(jwt_payload.id);
      console.info('jwt_payload.sub', jwt_payload);
      console.info('user', user);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (e) {
      return done(e);
    } finally {
      if (dbCliente) {
        dbCliente.release();
      }
    }
  })
);
