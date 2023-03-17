import request, { Response } from 'supertest'
import app from "../app"
import { BookingInter } from '../types/bookings/BookingInter'
import jwt from "jsonwebtoken";
import 'dotenv/config'

interface AuthInter {
  token: string
}

let auth: AuthInter = { token: ''}
function setToken() : void {
  const token = jwt.sign({ user: { email:'admin@admin.com', password: '1234' } },process.env.SECRET_KEY)
  auth.token = token
}
beforeAll(()=> {setToken()})
describe('Bookings endpoint', () => {

  it('GET all bookings', async (): Promise<void> => {
    const res: Response = await request(app)
      .get('/bookings')
      .set('Authorization', `bearer ${auth.token}`)
      .expect(200)
      .expect('Content-Type', /json/)

    expect(res.body).toBeInstanceOf(Array)
  })
  it('GET one booking', async (): Promise<void> => {
    const res: Response = await request(app)
      .get('/bookings/1')
      .set('Authorization', `bearer ${auth.token}`)
      .expect(200)
      .expect('Content-Type', /json/)

    expect(res.body).toHaveProperty('id', 1)
  })
  // it('POST create new booking', async (): Promise<void> => {
  //   const obj: BookingInter = {
  //     "photo": "https://www.plazaespana-hotel.com/files/hotel/vp-plaza-espana-madrid/02-habitaciones/deluxe_correcta/VP_PE_DELUXE_614_1.jpg",
  //       "id": 1,
  //       "guest": "Rahel Broune",
  //       "orderDate": "6/3/2022",
  //       "checkin": "12/30/2022",
  //       "checkout": "1/21/2023",
  //       "roomId": 45,
  //       "price": 483,
  //       "specialRequest": "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
  //       "amenities": [
  //           "Tv",
  //           "Minibar"
  //       ],
  //       "typeRoom": "Double Superior",
  //       "description": "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
  //       "state": "checkin"
  //   }
  //   const res: Response = await request(app)
  //     .post('/bookings')
  //     .send(obj)
  //     .expect(200)
  //   expect(res.body).toEqual(obj)
  // })
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
      .put('/bookings/1')
      .set('Authorization', `bearer ${auth.token}`)
      .send(obj)
      .expect(200)
    expect(res.body).toEqual(obj)
  })
  it('DELETE one booking', async (): Promise<void> => {
    const res: Response = await request(app)
      .delete('/bookings/2')
      .set('Authorization', `bearer ${auth.token}`)
      .expect(200)
      .expect('Content-Type', /json/)

    expect(res.body).toHaveProperty('id', 2)

  })
})
