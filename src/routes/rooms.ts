import express, { NextFunction, Request, Response } from 'express';
import { deleteRoom, editRoom, getAllRooms, getRoom, newRoom } from '../controllers/roomsController';

const routerRooms = express.Router();

routerRooms.get('/', getAllRooms)

routerRooms.get('/:roomId', getRoom)

routerRooms.post('/', newRoom);

routerRooms.put('/:roomId', editRoom);

routerRooms.delete('/:roomId', deleteRoom);

export default routerRooms