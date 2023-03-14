import bookings from '../data/bookings.json'
import { BookingInter } from '../types/bookings/BookingInter'

export const getAllBookings = async (): Promise<BookingInter[]> => {
  return bookings
}

export const getBooking =  async (id: number): Promise<BookingInter | null> =>{
  const booking = await bookings.find(item => item.id === Number(id))
  return booking ? booking : null
}

export const editBooking = async (booking: BookingInter): Promise<BookingInter | undefined> =>{
  const updatebooking = await bookings.find(item=> item.id === booking.id)
  return updatebooking
}

export const newBooking = async (booking: BookingInter): Promise<BookingInter> =>{
  return booking
}

export const deleteBooking = async (id:number): Promise<BookingInter | undefined >=> {
  const booking = await bookings.find(item => item.id === Number(id))
  return booking

}

