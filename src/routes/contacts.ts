import express, { NextFunction, Request, Response } from 'express';
import { deleteContact, editContact, getAllContacts, getContact, newContact } from '../controllers/contactsControllers';

const routerContacts = express.Router();

routerContacts.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contacts = await getAllContacts()
    if (!contacts) throw new Error("not found")
    res.send(contacts)
  } catch (error) {
    next(error)
  }
});

routerContacts.get('/:contactId',async (req: Request, res: Response, next: NextFunction) => {
  const {contactId} = req.params
  try {
    const contact = await getContact(Number(contactId))
    !contact
      ? res.status(404).send({ msg: 'Contact not found' })
      : res.send(contact)
  } catch (error) {
    next(error)
  }
});

routerContacts.post('/newContact',async (req: Request, res: Response, next: NextFunction) => {
const contact = req.body
  try {
    const contactNew = await newContact(contact)
    res.send(contactNew)
  } catch (error) {
    next(error)
  }
});

routerContacts.put('/editContact/:contactId', async (req: Request, res: Response, next: NextFunction) =>{
const contact = req.body
  try {
    const updateContact = await editContact(contact)
    res.send(updateContact)
  } catch (error) {
    next(error)
  }
});

routerContacts.delete('/:contactId', async (req: Request, res: Response, next: NextFunction)=> {
  const { contactId } = req.params
  try {
    const deleteCont = await deleteContact(Number(contactId))
    !deleteCont
      ? res.status(404).send({ msg: 'Contact not found' })
      : res.send(deleteCont)
  } catch (error) {
    next(error)
  }
});

export default routerContacts