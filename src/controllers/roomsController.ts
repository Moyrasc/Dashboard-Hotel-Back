import { NextFunction } from 'express';
import rooms from '../data/rooms.json'

export const getAllRooms = (_req: any, res: any, next: NextFunction): Response | void => {
  try {
     res.send(rooms);
  } catch (error) {
    next(error);
  }
}
export const getRoom = (req: any, res: any, next: NextFunction): Response | void => {
  try {
    const roomId = req.params.roomId
    const room = rooms.find(room => room.id === Number(roomId))
    res.send(room)
  } catch (error) {
    next(error)
  }
}
export const editRoom = (req: any, res: any, next: NextFunction): Response | void => {
  try {
    const roomId = req.params.roomId
    const editRoom = rooms.find(room => room.id === Number(roomId))
    res.send(editRoom)
  } catch (error) {
    next(error)
  }
}
export const newRoom = (req: any, res: any, next: NextFunction): Response | void => {
  try {
    res.send({ success: true, room: req.body });
  } catch (error) {
    next(error)
  }
}
export const deleteRoom = (req: any, res: any, next: NextFunction): Response | void => {
  try {
    const roomId = req.params.roomId
    const deleteRoom = rooms.find(room => room.id === Number(roomId))
    res.send(deleteRoom)
  } catch (error) {
    next(error)
  }
}


