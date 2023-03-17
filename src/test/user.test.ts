import request, { Response } from 'supertest'
import app from "../app"
import { UserInter } from '../types/users/UserInter'
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
describe.only('Users endpoint', () => {
  
  it('GET all users', async (): Promise<void> => {
    const res: Response = await request(app)
      .get('/users')
      .set('Authorization', `bearer ${auth.token}`)
      .expect(200)
      .expect('Content-Type', /json/)

    expect(res.body).toBeInstanceOf(Array)
  })
  it('GET one user', async (): Promise<void> => {
    const res: Response = await request(app)
      .get('/users/1')
      .set('Authorization', `bearer ${auth.token}`)
      .expect(200)
      .expect('Content-Type', /json/)

    expect(res.body).toHaveProperty('id', 1)
  })
  // it('POST create new user', async (): Promise<void> => {
  //   const obj: UserInter = {
  //       id: 49,
  //       name: "Dorry Denziloe",
  //       email: "ddenziloey@prnewswire.com",
  //       phone: "1878605813",
  //       job: "Manager",
  //       status: "active",
  //       avatar: "https://xsgames.co/randomusers/avatar.php?g=male",
  //       description: "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
  //       password: "mE72KCaY",
  //       startDate: "12/10/2022"
  //   }
  //   const res: Response = await request(app)
  //     .post('/users')
  //     .send(obj)
  //     .expect(200)
  //   expect(res.body).toEqual(obj)
  // })
  it('PUT edit user', async (): Promise<void> => {
    const obj: UserInter = {
        id: 1,
        name: "Hobie Yurmanovev",
        email: "hyurmanovev0@arizona.edu",
        phone: "1575300651",
        job: "Recepción",
        status: "active",
        avatar: "https://xsgames.co/randomusers/avatar.php?g=male",
        description: "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo",
        password: "odIhWtvRD",
        startDate: "9/26/2019"
    }
    
    const res: Response = await request(app)
      .put('/users/1')
      .set('Authorization', `bearer ${auth.token}`)
      .send(obj)
      .expect(200)
    expect(res.body).toEqual(obj)
  })
  it('DELETE one user', async (): Promise<void> => {
    const res: Response = await request(app)
      .delete('/users/2')
      .set('Authorization', `bearer ${auth.token}`)
      .expect(200)
      .expect('Content-Type', /json/)

    expect(res.body).toHaveProperty('id', 2)

  })
})