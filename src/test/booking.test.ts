import request, { Response } from 'supertest'
import app from "../app"
import { BookingInter } from '../types/bookings/BookingInter'


describe('Bookings endpoint', () => {

  it('GET all bookings', async (): Promise<void> => {
    const res: Response = await request(app)
      .get('/bookings')
      .expect(200)
      .expect('Content-Type', /json/)

    expect(res.body).toBeInstanceOf(Array)
  })
  it('GET one booking', async (): Promise<void> => {
    const res: Response = await request(app)
      .get('/bookings/id/1')
      .expect(200)
      .expect('Content-Type', /json/)

    expect(res.body).toHaveProperty('id', 1)
  })
  it('POST create new booking', async (): Promise<void> => {
    const obj: BookingInter = {
      id: 45,
      guest: 'Andrew Luc',
      orderDate: '15/03/2023',
      checkin: '19/03/2023',
      checkout: '22/03/2023',
      roomId: 45,
      price: 420,
      specialRequest: 'lorem impsum...',
      amenities: ['tv,ac,pets'],
      typeRoom: 'single Room',
      description: 'lorem ipsum..',
      photo: '',
      state: 'booked'
    }
    const res: Response = await request(app)
      .post('/bookings/newBooking')
      .send(obj)
      .expect(200)
    expect(res.body).toEqual(obj)
  })
  it('PUT edit booking', async (): Promise<void> => {
    const obj: BookingInter = {
      photo: "https://www.plazaespana-hotel.com/files/hotel/vp-plaza-espana-madrid/02-habitaciones/deluxe_correcta/VP_PE_DELUXE_614_1.jpg",
      id: 1,
      guest: "Rahel Broune",
      orderDate: "6/3/2022",
      checkin: "12/30/2022",
      checkout: "1/21/2023",
      roomId: 45,
      price: 483,
      specialRequest: "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
      amenities: [
        "Tv",
        "Minibar"
      ],
      typeRoom: "Double Superior",
      description: "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
      state: "checkin"
    }
    const res: Response = await request(app)
      .put('/bookings/editBooking/1')
      .send(obj)
      .expect(200)
    expect(res.body).toEqual(obj)
  })
  it('DELETE one booking', async (): Promise<void> => {
    const res: Response = await request(app)
      .delete('/bookings/id/2')
      .expect(200)
      .expect('Content-Type', /json/)

    expect(res.body).toHaveProperty('id', 2)

  })
})
