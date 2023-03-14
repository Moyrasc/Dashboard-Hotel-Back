import passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import 'dotenv/config'
import { UserAuth } from '../types/users/userAuth';

const HARDUSER: UserAuth = {
  email: 'admin@admin.com',
  password: '1234'
};

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email: string, password: string, done: Function): Promise<any> => {
      try {
        if (HARDUSER.email !== email || HARDUSER.password !== password) {
          return done(null, false, { message: 'User not found or wrong password' });
        }

        return done(null, HARDUSER, { message: 'Logged in Successfully' });

      } catch (error) {
        return done(error)
      }
    }
  )
)

passport.use(
  new JWTStrategy(
    {
      secretOrKey: process.env.SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async (token: any, done: VerifiedCallback) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
)