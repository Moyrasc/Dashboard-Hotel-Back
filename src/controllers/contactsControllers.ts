import { NextFunction } from 'express';
import contacts from '../data/contacts.json'

export const getAllContacts =  (_req: any, res: any, next: NextFunction): Response | void => {
  try {
    return res.send(contacts);
  } catch (error) {
    next(error);
  }
}
export const getContact = (req: any, res: any, next: NextFunction): Response | void => {
  try {
    const {contactId} = req.params
    const contact = contacts.find(contact => contact.id === Number(contactId))
    res.send(contact)
  } catch (error) {
    next(error)
  }
}
export const editContact = (req: any, res: any, next: NextFunction): Response | void => {
  try {
    const {contactId} = req.params
    const editContact = contacts.find(contact => contact.id === Number(contactId))
    res.send(editContact)
  } catch (error) {
    next(error)
  }
}
export const newContact = (req: any, res: any, next: NextFunction): Response | void => {
  try {
    return res.json({ success: true, contact: req.body });
  } catch (error) {
    next(error)
  }
}
export const deleteContact = (req: any, res: any, next: NextFunction): Response | void => {
  try {
    const {contactId} = req.params
    const deleteContact = contacts.find(contact => contact.id === Number(contactId))
    res.send(deleteContact)
  } catch (error) {
    next(error)
  }
}