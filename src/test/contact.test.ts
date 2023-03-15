import request, { Response } from 'supertest'
import app from "../app"
import { ContactInter } from '../types/contacts/ContactInter'

describe('Contacts endpoint', () => {
  it('GET all contacts', async (): Promise<void> => {
    const res: Response = await request(app)
      .get('/contacts')
      .expect(200)
      .expect('Content-Type', /json/)

    expect(res.body).toBeInstanceOf(Array)
  })
  it('GET one contact', async (): Promise<void> => {
    const res: Response = await request(app)
      .get('/contacts/1')
      .expect(200)
      .expect('Content-Type', /json/)

    expect(res.body).toHaveProperty('id', 1)
  })
  it('POST create new contact', async (): Promise<void> => {
    const obj: ContactInter = {
        id: 50,
        date: "2/5/2023",
        customer: "Wanda Haggis",
        email: "whaggiss@cornell.edu",
        phone: "3791152579",
        subject: "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        comment: "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
        actionPublish: "Publish",
        actionArchived: "Archive"
    }
    const res: Response = await request(app)
      .post('/contacts/newContact')
      .send(obj)
      .expect(200)
    expect(res.body).toEqual(obj)
  })
  it('PUT edit contact', async (): Promise<void> => {
    const obj: ContactInter = {
        id: 29,
        date: "2/5/2023",
        customer: "Wanda Haggis",
        email: "whaggiss@cornell.edu",
        phone: "3791152579",
        subject: "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        comment: "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
        actionPublish: "Publish",
        actionArchived: "Archive"
    }
    
    const res: Response = await request(app)
      .put('/contacts/editContact/1')
      .send(obj)
      .expect(200)
    expect(res.body).toEqual(obj)
  })
  it('DELETE one contact', async (): Promise<void> => {
    const res: Response = await request(app)
      .delete('/contacts/2')
      .expect(200)
      .expect('Content-Type', /json/)

    expect(res.body).toHaveProperty('id', 2)

  })
})