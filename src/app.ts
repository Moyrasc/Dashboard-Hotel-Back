import express from "express";
import morgan from "morgan";
import cors from 'cors';
import passport from "passport";
import isAuth from "./middlewares/isAuth";

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use(passport.initialize())
passport.use(isAuth)

app.get('/',(req, res)=>{
  res.send('probando')
})

export default app