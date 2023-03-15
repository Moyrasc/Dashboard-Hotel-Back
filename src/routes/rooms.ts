import express, { NextFunction, Request, Response } from 'express';
import { deleteRoom, editRoom, getAllRooms, getRoom, newRoom } from '../controllers/roomsController';

const routerRooms = express.Router();

routerRooms.get('/', async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const rooms = await getAllRooms()
    if (!rooms) throw new Error("not found")
    res.send(rooms)
  } catch (error) {
    next(error)
  }
});

routerRooms.get('/id/:roomId', async (req: Request, res: Response, next: NextFunction) => {
  const { roomId } = req.params
  try {
    const room = await getRoom(Number(roomId))
    !room
      ? res.status(404).send({ msg: 'room not found' })
      : res.send(room)
  } catch (error) {
    next(error)
  }
})

routerRooms.post('/newRoom', async (req: Request, res: Response, next: NextFunction) => {
  const room = req.body
  try {
    const roomNew = await newRoom(room)
    res.send(roomNew)
  } catch (error) {
    next(error)
  }
});;

routerRooms.put('/editRoom/:roomId', async (req: Request, res: Response, next: NextFunction) => {
  const room = req.body
  try {
    const updateRoom = await editRoom(room)
    res.send(updateRoom)
  } catch (error) {
    next(error)
  }
});

routerRooms.delete('/id/:roomId', async (req: Request, res: Response, next: NextFunction) => {
  const { roomId } = req.params
  try {
    const deleteRo = await deleteRoom(Number(roomId))
    !deleteRo
      ? res.status(404).send({ msg: 'Room not found' })
      : res.send(deleteRo)
  } catch (error) {
    next(error)
  }
});

export default routerRooms