import contacts from '../data/contacts.json'
import { ContactInter } from '../types/contacts/ContactInter'

export const getAllContacts = async (): Promise<ContactInter[]> =>{
  return contacts

}
export const getContact = async (id: number): Promise<ContactInter | null> =>{
  const contact = await contacts.find(item => item.id === Number(id))
  return contact ? contact : null

}
export const editContact = async (contact: ContactInter): Promise<ContactInter | undefined> =>{
  const updateContact = await contacts.find(item=> item.id === contact.id)
  return updateContact

}
export const newContact = async (contact : ContactInter): Promise<ContactInter> =>{
  return contact

}
export const deleteContact = async (id: number): Promise<ContactInter | undefined> => {
  const deleteCont = await contacts.find(item => item.id === Number(id))
  return deleteCont
}