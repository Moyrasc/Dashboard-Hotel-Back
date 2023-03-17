import { NextFunction } from 'express';
import bookings from '../data/bookings.json'


export const getAllBookings = (_req: any, res: any, next: NextFunction): Response | void => {
  try {
    res.send(bookings);
  } catch (error) {
    next(error);
  }
}
export const getBooking = (req: any, res: any, next: NextFunction): Response | void => {
  try {
    const bookingId = req.params.bookingId
    const booking = bookings.find(booking => booking.id === Number(bookingId))
    res.send(booking)
  } catch (error) {
    next(error)
  }
}

export const editBooking = (req: any, res: any, next: NextFunction): Response | void => {
  try {
    const bookingId = req.params.bookingId
    const editBooking = bookings.find(booking => booking.id === Number(bookingId))
    res.send(editBooking)
  } catch (error) {
    next(error)
  }
}

export const newBooking = (req: any, res: any, next: NextFunction): Response | void => {
  try {
    return res.send({ success: true, booking: req.body });
  } catch (error) {
    next(error)
  }
}

export const deleteBooking = (req: any, res: any, next: NextFunction): Response | void => {
  try {
    const bookingId = req.params.bookingId
    const deleteBooking = bookings.find(booking => booking.id === Number(bookingId))
    res.send(deleteBooking)
  } catch (error) {
    next(error)
  }
}

