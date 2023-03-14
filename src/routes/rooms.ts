import express from 'express';

const routerRooms = express.Router();

routerRooms.get('/rooms');

routerRooms.get('/:roomId');

routerRooms.post('/newRoom');

routerRooms.put('/editRoom/:roomId');

routerRooms.delete('/:roomId');