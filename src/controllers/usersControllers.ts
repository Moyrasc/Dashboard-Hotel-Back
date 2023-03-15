import users from '../data/users.json'
import { UserInter } from "../types/users/UserInter"

export const getAllUsers = async (): Promise<UserInter[]> =>{
  return users

}
export const getUser = async (id: number): Promise<UserInter | null> =>{
  const user = await users.find(item => item.id === Number(id))
  return user ? user : null

}
export const editUser = async (user: UserInter): Promise<UserInter | undefined> =>{
  const updateUser = await users.find(item=> item.id === user.id)
  return updateUser

}
export const newUser = async (user: UserInter): Promise<UserInter> =>{
  return user
}
export const deleteUser = async (id: number): Promise <UserInter | undefined> => {
  const deleteUs = await users.find(item => item.id === Number(id))
  return deleteUs
}