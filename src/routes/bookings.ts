import express from 'express';

const routerBookings = express.Router();

routerBookings.get('/bookings');

routerBookings.get('/:bookingId');

routerBookings.post('/newBooking');

routerBookings.put('/editBooking/:bookingId');

routerBookings.delete('/:bookingId');

export default routerBookings