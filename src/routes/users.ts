import express from 'express';

const routerUsers = express.Router();

routerUsers.get('/users');

routerUsers.get('/:userId');

routerUsers.post('/newUser');

routerUsers.put('/editUser/:userId');

routerUsers.delete('/:userId');