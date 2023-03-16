import express from "express";
import morgan from "morgan";
import cors from 'cors';
import passport from "passport";
import isAuth from "./middlewares/isAuth";
import routerBookings from "./routes/bookings";
import routerRooms from "./routes/rooms";
import routerContacts from "./routes/contacts";
import routerUsers from "./routes/users";
import routerLogin from "./routes/login";
require('./auth/auth')

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use(passport.initialize())
passport.use(isAuth)


app.use('/login',routerLogin)
app.use('/bookings',routerBookings)
app.use('/rooms',routerRooms)
app.use('/contacts',routerContacts)
app.use('/users',routerUsers)

app.use(express.static('public'))
app.get('/private', passport.authenticate('jwt', { session: false }), (_req, res) => {
  res.send({ message: 'ok' })
})

// errors 404
app.use((_req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Not Found'
  })
})

app.use((error: any, _req: any, res: any, _next: any) => {
  res.status((error.httpStatus !== undefined) ? error.httpStatus : 500).send({
    status: 'error',
    message: error.message
  })
})

export default app