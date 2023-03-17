import request, { Response } from 'supertest'
import app from "../app"
import { ContactInter } from '../types/contacts/ContactInter'
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
describe('Contacts endpoint', () => {

  it('GET all contacts', async (): Promise<void> => {
    const res: Response = await request(app)
      .get('/contacts')
      .set('Authorization', `bearer ${auth.token}`)
      .expect(200)
      .expect('Content-Type', /json/)

    expect(res.body).toBeInstanceOf(Array)
  })
  it('GET one contact', async (): Promise<void> => {
    const res: Response = await request(app)
      .get('/contacts/1')
      .set('Authorization', `bearer ${auth.token}`)
      .expect(200)
      .expect('Content-Type', /json/)

    expect(res.body).toHaveProperty('id', 1)
  })
  // it('POST create new contact', async (): Promise<void> => {
  //   const obj: ContactInter = {
  //       id: 50,
  //       date: "2/5/2023",
  //       customer: "Wanda Haggis",
  //       email: "whaggiss@cornell.edu",
  //       phone: "3791152579",
  //       subject: "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
  //       comment: "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
  //       actionPublish: "Publish",
  //       actionArchived: "Archive"
  //   }
  //   const res: Response = await request(app)
  //     .post('/contacts/newContact')
  //     .set('Authorization', 'bearer ' + auth.token)
  //     .send(obj)
  //     .expect(200)
  //   expect(res.body).toEqual(obj)
  // })
  it('PUT edit contact', async (): Promise<void> => {
    const obj: ContactInter = {
        id: 1,
        date: "4/12/2022",
        customer: "Sybila Stratton",
        email: "sstratton0@un.org",
        phone: "3774774406",
        subject: "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        comment: "Duis bibendum. Morbi non quam nec dui luctus rutrum platea dictumst accumsan tortor quis turpis.",
        actionPublish: "Publish",
        actionArchived: "Archive"
    }   
    const res: Response = await request(app)
      .put('/contacts/1')
      .set('Authorization', `bearer ${auth.token}`)
      .send(obj)
      .expect(200)
    expect(res.body).toEqual(obj)
  })
  it('DELETE one contact', async (): Promise<void> => {
    const res: Response = await request(app)
      .delete('/contacts/2')
      .set('Authorization', `bearer ${auth.token}`)
      .expect(200)
      .expect('Content-Type', /json/)

    expect(res.body).toHaveProperty('id', 2)

  })
})