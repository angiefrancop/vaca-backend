import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import Repository from '../repositories/users.repository.js';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(
  new Strategy(options, function (jwt_payload, done) {
    try {
      const user = Repository().getUserById(jwt_payload.sub);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (e) {
      return done(e);
    }
  })
);
