import express from 'express';

const routerContacts = express.Router();

routerContacts.get('/contacts');

routerContacts.get('/:contactId');

routerContacts.post('/newContact');

routerContacts.put('/editContact/:contactId');

routerContacts.delete('/:contactId');

export default routerContacts