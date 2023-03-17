import express from 'express';
import { deleteUser, editUser, getAllUsers, getUser, newUser } from '../controllers/usersControllers';

const routerUsers = express.Router();

routerUsers.get('/', getAllUsers);

routerUsers.get('/:userId', getUser);

routerUsers.post('/', newUser);

routerUsers.put('/:userId', editUser);

routerUsers.delete('/:userId', deleteUser);

export default routerUsers