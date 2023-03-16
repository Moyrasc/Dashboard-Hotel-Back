import { Request, Response, NextFunction } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import 'dotenv/config'

const secretWord = (process.env.SECRET_KEY !== undefined) ? process.env.SECRET_KEY : 'secret'

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('login', async (err: any , user: any, info: any)=>{
    try {
      if (!user || err) {
        return res.status(401).send("Wrong credentials!")
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          return res.status(401);
        } else {
          return res.json(
            jwt.sign(
              { user: { email: user.email, password: user.password } },
              
              secretWord
            )
          );
        }
      });
    } catch (error) {

      return next(error)
    }
})(req, res, next)
}
