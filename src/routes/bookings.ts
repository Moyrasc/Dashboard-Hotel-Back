import express, { NextFunction, Request, Response } from 'express';
import { deleteBooking, editBooking, getAllBookings, getBooking, newBooking } from '../controllers/bookingsControllers';

const routerBookings = express.Router();

routerBookings.get('/', getAllBookings);

routerBookings.get('/:bookingId', getBooking);

routerBookings.post('/', newBooking);

routerBookings.put('/:bookingId', editBooking);

routerBookings.delete('/:bookingId', deleteBooking);

export default routerBookings