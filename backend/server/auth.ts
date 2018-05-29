import * as passport from 'passport';
import User from './modules/User/service';
import { Strategy, ExtractJwt } from 'passport-jwt';

let FacebookTokenStrategy = require('passport-facebook-token')

const config = require('./config/env/config')();

export function AuthConfig () {
  const UserService = User;
  let opts = {
    secretOrKey: config.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  };

  passport.use(new Strategy(opts, (jwtPayload, done) => {
    UserService.getById(jwtPayload.id)
      .then(user => {
        if(user) {
          return done(null, {
            id: user.id,
            email: user.email
          });
        }
        return done(null, false);
      })
      .catch(error => done(error, null));
  }));

   return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', {session: false}),
  };
}

export function FbAuth () {
  const UserService = User;
  passport.use(new FacebookTokenStrategy({
    clientID: config.clientID,
    clientSecret: config.clientSecret
  }
  , function(accessToken: any, refreshToken: any, profile: any, done: any) {
    UserService.getByEmail(profile._json.email)
    .then(user => {

      if(user) {
        return done(null, {
          email: user.email
        });
      }
      return done(null, false);
    })
    .catch(error => done(error, null));
  }
  ));
  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('facebook-token', {session: false}),
  };
}