import rooms from '../data/rooms.json'
import { RoomInter } from '../types/rooms/RoomInter'

export const getAllRooms = async () : Promise<RoomInter[]> =>{
  return rooms
}
export const getRoom = async (id: number): Promise<RoomInter | null> =>{
  const room = await rooms.find(item => item.id === Number(id))
  return room ? room : null
}
export const editRoom = async (room: RoomInter): Promise <RoomInter | undefined> =>{
  const updateroom = await rooms.find(item=> item.id === room.id)
  return updateroom
}
export const newRoom = async (room: RoomInter): Promise <RoomInter> => {
  return room
}
export const deleteRoom = async (id: number): Promise<RoomInter | undefined > => {
  const deleteRoom = await rooms.find(item => item.id === Number(id))
  return deleteRoom
  
}