import {faker}  from '@faker-js/faker';
import connection from './config';
import bcrypt from "bcrypt"

const removeTablesDB = ()=> {
  console.log('Deleting old tables...')
  connection.query('drop table if exists contacts')
  connection.query('drop table if exists users')
  connection.query('drop table if exists bookings')
  connection.query('drop table if exists amenities_rooms')
  connection.query('drop table if exists amenities')
  connection.query('drop table if exists rooms_photos')
  connection.query('drop table if exists photos')
  connection.query('drop table if exists rooms')
  console.log('Tables deleted ✔')
}
const createTablesDB = () => {
  console.log('Creating new tables ...')
  connection.query(`
  create table users(
  id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(32) NOT NULL,
    email CHAR(255) NOT NULL UNIQUE,
    password CHAR(255) NOT NULL,
    phone VARCHAR(32) NOT NULL,
    job CHAR(255) NOT NULL,
    description TEXT NOT NULL,
    avatar CHAR(255) NOT NULL,
    status VARCHAR(10) NOT NULL,
    startDate VARCHAR(32) NOT NULL
      )
  `)
  connection.query(`
  create table rooms(
    id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(32) NOT NULL,
    typeRoom VARCHAR(32) NOT NULL,
    roomFloor CHAR(32) NOT NULL,
    description TEXT NOT NULL,
    number INT NOT NULL,
    offers INT,
    price INT NOT NULL,
    discount INT,
    cancellation CHAR(255),
    status VARCHAR(10) NOT NULL
    )
  `)
  connection.query(`
  create table bookings(
    id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    guest VARCHAR(32) NOT NULL,
    orderDate VARCHAR(32) NOT NULL,
    checkin VARCHAR(32) NOT NULL,
    checkout VARCHAR(32) NOT NULL,
    roomId INT NOT NULL,
    price INT NOT NULL,
    specialRequest TEXT NOT NULL,
    description CHAR(255) NOT NULL,
    state VARCHAR(32) NOT NULL
      )
  `)
  connection.query(`
  create table contacts(
    id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    date VARCHAR(32) NOT NULL,
    customer VARCHAR(32) NOT NULL,
    email CHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(32) NOT NULL,
    subject CHAR(255) NOT NULL,
    comment TEXT NOT NULL,
    status VARCHAR(10)
      )
  `)
  connection.query(`
  create table amenities(
    id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(32) NOT NULL
    )
  `)
  connection.query(`
  create table amenities_rooms(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    amenitieID INT UNSIGNED  NOT NULL,
    roomID INT UNSIGNED NOT NULL,
    FOREIGN KEY  (amenitieID) REFERENCES amenities(id),
    FOREIGN KEY (roomID) REFERENCES rooms(id)
      )
  `)
  connection.query(`
  create table photos(
    id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    photo TEXT NOT NULL
    )
  `)
  connection.query(`
  create table rooms_photos(
    id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    photoID INT UNSIGNED NOT NULL,    
    roomID INT UNSIGNED  NOT NULL,
    FOREIGN KEY (roomID) references rooms(id),
    FOREIGN KEY(photoID) references photos(id)
    )
  `)
  console.log('Tables created ✔')
}
const createUserAdmin = () =>{
  const password = bcrypt.hashSync('1234', 10)
  connection.query(`
      insert into users 
      (name, email, password, phone, job, description,avatar,startDate, status)
      values
      (?)
    `, [['Noe','admin@admin.com',password,'666666666','admin','Non aspernatur vel odit tempora quas.Optio necessitatibus cumque cumque et fugiat sunt necessitatibus','ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/413.jpg','2023-03-23 05:26:06.167','active']])
}
const createUsersFake = async() => {
  for (let i = 0; i < 10; i++) {
    const name = faker.name.fullName()
    const email = faker.helpers.unique(faker.internet.email)
    const fakerpassword = faker.internet.password()
    const password = bcrypt.hashSync(fakerpassword, 10)
    const phone = faker.phone.number('##########')
    const job = faker.lorem.lines(1)
    const description = faker.lorem.lines(2)
    const avatar = faker.internet.avatar()
    const status = faker.helpers.arrayElement(['active', 'inactive'])
    const startDate = faker.date.recent()
    connection.query(`
      insert into users 
      (name, email, password, phone, job, description,avatar,startDate, status)
      values
      (?)
    `, [[name, email, password, phone, job, description,avatar,startDate, status]])
  }
}
const createRoomsFake = () => {
  for (let i = 0; i < 10; i++) {
    const name = faker.helpers.arrayElement(['Deluxe A-91','Deluxe B-91','Deluxe C-91'])
    const typeRoom = faker.helpers.arrayElement(['Single Bed', 'Suite', 'Double Superior', 'Double Bed '])
    const roomFloor = faker.helpers.arrayElement(['floor A-1','floor B-1', 'floor C-1'])
    const description = faker.lorem.lines(1)
    const number = faker.random.numeric(2)
    const offers = faker.random.numeric(2)
    const price = faker.random.numeric(5)
    const discount = faker.random.numeric(2)
    const cancellation = faker.lorem.lines(1)
    const status = faker.helpers.arrayElement(['Avalaible', 'Booked'])

    connection.query(`
      insert into rooms 
      (name,typeRoom, roomFloor, description, number, offers, price, discount, cancellation, status)
      values
      (?)
    `, [[name,typeRoom, roomFloor, description, number, offers, price, discount, cancellation, status]])
  }
}
const createBookingsFake = () => {
  for (let i = 0; i < 10; i++) {
    const guest = faker.name.fullName()
    const orderDate = faker.date.recent()
    const checkin = faker.date.between(orderDate, new Date())
    const checkout = faker.date.soon(10, checkin)
    const roomId = Math.floor(Math.random() * 10 + 1)
    const price = faker.random.numeric(5)
    const specialRequest = faker.lorem.lines(2)
    const description = faker.lorem.lines(2)
    const state = faker.helpers.arrayElement(['checkin', 'checkout', 'inprogress'])
    connection.query(`
      insert into bookings 
      (guest, orderDate, checkin, checkout, description, state, roomId, price, specialRequest)
      values
      (?)
    `, [[guest, orderDate, checkin, checkout, description, state, roomId, price, specialRequest]])
  }
}
const createContactsFake = () => {
  for (let i = 0; i < 10; i++) {
    const date = faker.date.recent()
    const customer = faker.name.fullName()
    const email = faker.helpers.unique(faker.internet.email)
    const phone = faker.phone.number('##########')
    const comment = faker.lorem.lines(1)
    const subject = faker.lorem.lines(1)
    const status = faker.helpers.arrayElement(['published', 'archived'])
    connection.query(`
      insert into contacts 
      (date, customer, email, phone, comment, subject, status)
      values
      (?)
    `, [[date, customer, email, phone, comment, subject, status]])
  }
}
const createAmenitiesFake = () => {
  const amenities = ['Vistas al mar', 'Bañera', 'TV', 'AC', 'Mascotas','Mini-bar']
  amenities.forEach(item => {
    connection.query(`
      insert into amenities (name) values (?)
    `, [item])
  })
}
const createRoomsAmenitiesFake = () => {
  for (let i = 0; i < 100; i++) {
    const roomID = Math.floor(Math.random() * 10 + 1)
    const amenitieID = Math.floor(Math.random() * 4 + 1)
    connection.query(`
      insert into amenities_rooms
      (roomID, amenitieID)
      values
      (?)
    `, [[roomID, amenitieID]])
  }
}
const createPhotosFaker = () =>{
  for (let i = 0; i < 50; i++) {
    const photo = faker.image.imageUrl()
    connection.query(`
    insert into photos
    (photo) values
      (?)`,[photo])
}
}
const createRoomPhotos = () => {
  for (let i = 0; i < 50; i++) {
    const photoID = Math.floor(Math.random() * 10 + 1)
    const roomID = Math.floor(Math.random() * 10 + 1)
    connection.query(`
      insert into rooms_photos
      (roomID, photoID)
      values
      (?)
    `, [[roomID, photoID]])
  }
}
removeTablesDB()
createTablesDB()
createUserAdmin()
createUsersFake()
createRoomsFake()
createContactsFake()
createBookingsFake()
createAmenitiesFake()
createRoomsAmenitiesFake()
createPhotosFaker()
createRoomPhotos()
connection.end()