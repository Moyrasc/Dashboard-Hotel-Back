CREATE TABLE users(
    id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(32) NOT NULL,
    email VARCHAR(32) NOT NULL UNIQUE,
    password VARCHAR(20) NOT NULL,
    phone VARCHAR(32) NOT NULL,
    job VARCHAR(32) NOT NULL,
    description TEXT NOT NULL,
    avatar CHAR(255) NOT NULL,
    status VARCHAR(10) NOT NULL,
    startDate VARCHAR(32) NOT NULL
);
CREATE TABLE rooms(
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
    status VARCHAR(10) NOT NULL,
);
CREATE TABLE bookings(
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
);
CREATE TABLE contacts(
    id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    date VARCHAR(32) NOT NULL,
    customer VARCHAR(32) NOT NULL,
    email VARCHAR(32) NOT NULL UNIQUE,
    phone VARCHAR(32) NOT NULL,
    subject CHAR(255) NOT NULL,
    comment TEXT NOT NULL,
    actionPublish VARCHAR(10)
    actionArchived VARCHAR(10)
);
CREATE TABLE amenities(
    id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(32) NOT NULL,
);
CREATE TABLE amenities_rooms(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    amenitieID INT UNSIGNED  NOT NULL,
    roomID INT UNSIGNED NOT NULL,
    FOREIGN KEY  (amenitieID) REFERENCES amenities(id),
    FOREIGN KEY (roomID) REFERENCES rooms(id),

);
CREATE TABLE photos(
    id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    photo CHAR(300) NOT NULL,
);
CREATE TABLE rooms_photos(
    id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,    
    roomID INT UNSIGNED  NOT NULL,
    FOREIGN KEY (roomID) references rooms(id),

);