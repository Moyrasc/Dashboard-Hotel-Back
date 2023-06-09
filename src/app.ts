import express from "express";
import morgan from "morgan";
import cors from 'cors';
import passport from "passport";
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
app.use(express.urlencoded({ extended: false }))



app.use('/login',routerLogin)
app.use('/bookings',passport.authenticate('jwt', { session: false }),routerBookings)
app.use('/rooms',passport.authenticate('jwt', { session: false }),routerRooms)
app.use('/contacts',passport.authenticate('jwt', { session: false }),routerContacts)
app.use('/users',passport.authenticate('jwt', { session: false }),routerUsers)



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