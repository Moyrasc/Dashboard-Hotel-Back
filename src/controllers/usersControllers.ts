import { NextFunction } from 'express';
import users from '../data/users.json'


export const getAllUsers = (_req: any, res: any, next: NextFunction): Response | void => {
  try {
      res.send(users);
  } catch (error) {
    next(error);
  }
}
export const getUser = (req: any, res: any, next: NextFunction): Response | void => {
  try {
    const {userId} = req.params
    const user = users.find(user => user.id === Number(userId))
    res.send(user)
  } catch (error) {
    next(error)
  }
}

export const editUser = (req: any, res: any, next: NextFunction): Response | void => {
  try {
    const {userId} = req.params
    const editUser = users.find(user => user.id === Number(userId))
    res.send(editUser)
  } catch (error) {
    next(error)
  }
}
export const newUser = (req: any, res: any, next: NextFunction): Response | void => {
  try {
    res.send({ success: true, user: req.body });
  } catch (error) {
    next(error)
  }
}
export const deleteUser = (req: any, res: any, next: NextFunction): Response | void => {
  try {
    const {userId} = req.params
    const deleteUser = users.find(user => user.id === Number(userId))
    res.send(deleteUser)
  } catch (error) {
    next(error)
  }
}
