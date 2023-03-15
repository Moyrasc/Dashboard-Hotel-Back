import request, { Response } from 'supertest'
import app from "../app"
import { UserInter } from '../types/users/UserInter'

describe('Users endpoint', () => {
  it('GET all users', async (): Promise<void> => {
    const res: Response = await request(app)
      .get('/users')
      .expect(200)
      .expect('Content-Type', /json/)

    expect(res.body).toBeInstanceOf(Array)
  })
  it('GET one user', async (): Promise<void> => {
    const res: Response = await request(app)
      .get('/users/1')
      .expect(200)
      .expect('Content-Type', /json/)

    expect(res.body).toHaveProperty('id', 1)
  })
  it('POST create new user', async (): Promise<void> => {
    const obj: UserInter = {
        id: 49,
        name: "Dorry Denziloe",
        email: "ddenziloey@prnewswire.com",
        phone: "1878605813",
        job: "Manager",
        status: "active",
        avatar: "https://xsgames.co/randomusers/avatar.php?g=male",
        description: "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
        password: "mE72KCaY",
        startDate: "12/10/2022"
    }
    const res: Response = await request(app)
      .post('/users/newUser')
      .send(obj)
      .expect(200)
    expect(res.body).toEqual(obj)
  })
  it('PUT edit user', async (): Promise<void> => {
    const obj: UserInter = {
        id: 35,
        name: "Dorry Denziloe",
        email: "ddenziloey@prnewswire.com",
        phone: "1878605813",
        job: "Manager",
        status: "active",
        avatar: "https://xsgames.co/randomusers/avatar.php?g=male",
        description: "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
        password: "mE72KCaY",
        startDate: "12/10/2022"
    }
    
    const res: Response = await request(app)
      .put('/users/editUser/1')
      .send(obj)
      .expect(200)
    expect(res.body).toEqual(obj)
  })
  it('DELETE one user', async (): Promise<void> => {
    const res: Response = await request(app)
      .delete('/users/id/2')
      .expect(200)
      .expect('Content-Type', /json/)

    expect(res.body).toHaveProperty('id', 2)

  })
})