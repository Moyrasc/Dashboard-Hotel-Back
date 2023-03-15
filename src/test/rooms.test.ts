import request, { Response } from 'supertest'
import app from "../app"
import { RoomInter } from '../types/rooms/RoomInter'

describe('Rooms endpoint', () => {
  it('GET all rooms', async (): Promise<void> => {
    const res: Response = await request(app)
      .get('/rooms')
      .expect(200)
      .expect('Content-Type', /json/)

    expect(res.body).toBeInstanceOf(Array)
  })
  it('GET one room', async (): Promise<void> => {
    const res: Response = await request(app)
      .get('/rooms/id/1')
      .expect(200)
      .expect('Content-Type', /json/)

    expect(res.body).toHaveProperty('id', 1)
  })
  it('POST create new room', async (): Promise<void> => {
    const obj: RoomInter = {
      id: 45,
      name: 'Andrew Luc',
      number: 45,
      price: 420,
      offers: 15,
      amenities: 'tv,ac,pets',
      discount:5,
      typeRoom: 'single Room',
      description: 'lorem ipsum..',
      cancellation:'lorem ipsum..',
      photo: [],
      roomFloor: 'a-2',
      status: 'booked'
    }
    const res: Response = await request(app)
      .post('/rooms/newRoom')
      .send(obj)
      .expect(200)
    expect(res.body).toEqual(obj)
  })
  it('PUT edit room', async (): Promise<void> => {
    const obj: RoomInter = {
        id: 40,
        name: "Deluxe A-91",
        typeRoom: "Suite",
        description: "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
        photo: [
            "https://cf.bstatic.com/xdata/images/hotel/max1024x768/228377636.jpg?k=0a5dcba1ca80f14d250bd7056f2236f11430a3adb664cb7f87ced4ab735c9696&o=",
            "https://cf.bstatic.com/xdata/images/hotel/max1024x768/228377622.jpg?k=5bae0ab3d9fe3e50892c7ec31140c40066f095db85d8588025a030be0b11b20c&o=",
            "https://cf.bstatic.com/xdata/images/hotel/max1024x768/228377618.jpg?k=e2e6a7e0e3577d8c3890f498058e15f25aebf6fe5208b9255b1737d35e93b5f0&o=",
            "https://cf.bstatic.com/xdata/images/hotel/max1024x768/229343198.jpg?k=cc637e425da0c34516dc5df046b1027713408c890d6f4f11d170a55e85733e64&o=",
            "https://cf.bstatic.com/xdata/images/hotel/max1024x768/228377631.jpg?k=cb951e8713a673f5c44756ff2ddbabe32827399e145681b1ea6d0db9ab95dc9d&o=",
            "https://cf.bstatic.com/xdata/images/hotel/max1024x768/229283897.jpg?k=4539b8c016bdf8a3d14b6563843233c7742011430944e6d255d5d8587d232c44&o="
        ],
        number: 40,
        offers: 15,
        price: 714,
        discount: 60,
        cancellation: "Sed ante. Vivamus tortor. Duis mattis egestas metus.",
        amenities: "TV, AC, Mascotas, Bañera, Balcón, Mini-bar",
        status: 
            "Booked"
        ,
        roomFloor: "floor A-2"
    }
    
    const res: Response = await request(app)
      .put('/rooms/editRoom/1')
      .send(obj)
      .expect(200)
    expect(res.body).toEqual(obj)
  })
  it('DELETE one room', async (): Promise<void> => {
    const res: Response = await request(app)
      .delete('/rooms/id/2')
      .expect(200)
      .expect('Content-Type', /json/)

    expect(res.body).toHaveProperty('id', 2)

  })
})