import express, { NextFunction, Request, Response } from 'express';
import { deleteUser, editUser, getAllUsers, getUser, newUser } from '../controllers/usersControllers';

const routerUsers = express.Router();

routerUsers.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getAllUsers()
    if (!users) throw new Error("not found")
    res.send(users)
  } catch (error) {
    next(error)
  }
});

routerUsers.get('/:userId', async (req: Request, res: Response, next: NextFunction)=>{
  const {userId} = req.params
  try {
    const user = await getUser(Number(userId))
    !user
      ? res.status(404).send({ msg: 'User not found' })
      : res.send(user)
  } catch (error) {
    next(error)
  }
});

routerUsers.post('/newUser', async (req: Request, res: Response, next: NextFunction)=>{
  const user = req.body
  try {
    const userNew = await newUser(user)
    res.send(userNew)
  } catch (error) {
    next(error)
  }
});

routerUsers.put('/editUser/:userId', async (req: Request, res: Response, next: NextFunction)=>{
  const user = req.body
  try {
    const updateUser = await editUser(user)
    res.send(updateUser)
  } catch (error) {
    next(error)
  }
});

routerUsers.delete('/id/:userId', async (req: Request, res: Response, next: NextFunction)=>{
  const { userId } = req.params
  try {
    const deleteUs = await deleteUser(Number(userId))
    !deleteUs
      ? res.status(404).send({ msg: 'user not found' })
      : res.send(deleteUs)
  } catch (error) {
    next(error)
  }
});

export default routerUsers