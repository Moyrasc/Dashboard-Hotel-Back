import express from 'express';
import { deleteContact, editContact, getAllContacts, getContact, newContact } from '../controllers/contactsControllers';

const routerContacts = express.Router();

routerContacts.get('/', getAllContacts);

routerContacts.get('/:contactId',getContact);

routerContacts.post('/',newContact);

routerContacts.put('/:contactId', editContact);

routerContacts.delete('/:contactId',deleteContact);

export default routerContacts