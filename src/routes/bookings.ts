import express, { NextFunction, Request, Response } from 'express';
import { deleteBooking, editBooking, getAllBookings, getBooking, newBooking } from '../controllers/bookingsControllers';

const routerBookings = express.Router();

routerBookings.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookings = await getAllBookings()
    if (!bookings) throw new Error("not found")
    res.send(bookings)
  } catch (error) {
    next(error)
  }
});

routerBookings.get('/id/:bookingId', async (req: Request, res: Response, next: NextFunction) => {
  const { bookingId } = req.params
  try {
    const booking = await getBooking(Number(bookingId))
    !booking
      ? res.status(404).send({ msg: 'booking not found' })
      : res.send(booking)
  } catch (error) {
    next(error)
  }
});

routerBookings.post('/newBooking', async (req: Request, res: Response, next: NextFunction) => {
  const booking = req.body
  try {
    const bookingNew = await newBooking(booking)
    res.send(bookingNew)
  } catch (error) {
    next(error)
  }
});

routerBookings.put('/editBooking/:bookingId', async (req: Request, res: Response, next: NextFunction) => {
  const booking = req.body
  try {
    const updateBooking = await editBooking(booking)
    res.send(updateBooking)
  } catch (error) {
    next(error)
  }
});

routerBookings.delete('/id/:bookingId', async (req: Request, res: Response, next: NextFunction) => {
  const { bookingId } = req.params
  try {
    const deleteBook = await deleteBooking(Number(bookingId))
    !deleteBook
      ? res.status(404).send({ msg: 'booking not found' })
      : res.send(deleteBook)
  } catch (error) {
    next(error)
  }
});

export default routerBookings