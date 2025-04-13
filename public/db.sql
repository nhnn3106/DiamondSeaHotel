CREATE DATABASE db;
USE db;
CREATE TABLE Accounts (
    accountID INT PRIMARY KEY,
    PASSWORD NVARCHAR(255),
    sdt NVARCHAR(20),
    userName NVARCHAR(100),
    email NVARCHAR(100)
);

CREATE TABLE Hotels (
    hotelID INT PRIMARY KEY,
    name NVARCHAR(255),
    location NVARCHAR(255),
    danhGia FLOAT,
    moTa TEXT
);

CREATE TABLE RoomTypes (
    roomTypeID INT PRIMARY KEY,
    name NVARCHAR(255),
    price DECIMAL(10,2),
    dienTich FLOAT,
    soNguoi INT,
    bedType NVARCHAR(100),
    bedCount INT,
    hotelID INT,
    FOREIGN KEY (hotelID) REFERENCES Hotels(hotelID)
);

CREATE TABLE RoomTypeImages (
    roomTypeID INT,
    imageID INT,
    pathImg NVARCHAR(255),
    PRIMARY KEY (roomTypeID, imageID),
    FOREIGN KEY (roomTypeID) REFERENCES RoomTypes(roomTypeID)
);

CREATE TABLE Orders (
    orderID INT PRIMARY KEY,
    price DECIMAL(10,2),
    roomTypeID INT,
    orderDate DATE,
    checkInDate DATE,
    checkOutDate DATE,
    accountID INT,
    FOREIGN KEY (roomTypeID) REFERENCES RoomTypes(roomTypeID),
    FOREIGN KEY (accountID) REFERENCES Accounts(accountID)
);

CREATE TABLE Services (
    serviceID INT PRIMARY KEY,
    name NVARCHAR(255),
    pathImg NVARCHAR(255)
);

CREATE TABLE Hotel_Service (
    serviceID INT,
    hotelID INT,
    PRIMARY KEY (serviceID, hotelID),
    FOREIGN KEY (serviceID) REFERENCES Services(serviceID),
    FOREIGN KEY (hotelID) REFERENCES Hotels(hotelID)
);

CREATE TABLE Amenities (
    amenityID INT PRIMARY KEY,
    name NVARCHAR(255),
    pathImg NVARCHAR(255)
);

CREATE TABLE Room_Amenity (
    roomTypeID INT,
    amenityID INT,
    PRIMARY KEY (roomTypeID, amenityID),
    FOREIGN KEY (roomTypeID) REFERENCES RoomTypes(roomTypeID),
    FOREIGN KEY (amenityID) REFERENCES Amenities(amenityID)
);

CREATE TABLE HotelImages (
    hotelID INT,
    imageID INT,
    pathImg NVARCHAR(255),
    PRIMARY KEY (hotelID, imageID),
    FOREIGN KEY (hotelID) REFERENCES Hotels(hotelID)
);

-- Thêm dữ liệu mẫu cho bảng Hotels (10 khách sạn)
INSERT INTO Hotels (hotelID, name, location, danhGia, moTa) VALUES
(1, 'Hotel A', 'Hanoi', 4.5, 'Luxury hotel in Hanoi');
INSERT INTO Hotels (hotelID, name, location, danhGia, moTa) VALUES
(2, 'Hotel B', 'Ho Chi Minh', 4.2, 'Comfortable stay in HCMC');
INSERT INTO Hotels (hotelID, name, location, danhGia, moTa) VALUES
(3, 'Hotel C', 'Da Nang', 4.0, 'Scenic views and modern amenities');
INSERT INTO Hotels (hotelID, name, location, danhGia, moTa) VALUES
(4, 'Hotel D', 'Hue', 3.8, 'Historical ambience with modern comforts');
INSERT INTO Hotels (hotelID, name, location, danhGia, moTa) VALUES
(5, 'Hotel E', 'Nha Trang', 4.3, 'Beachfront hotel with excellent service');
INSERT INTO Hotels (hotelID, name, location, danhGia, moTa) VALUES
(6, 'Hotel F', 'Can Tho', 4.1, 'Riverside hotel with local flavor');
INSERT INTO Hotels (hotelID, name, location, danhGia, moTa) VALUES
(7, 'Hotel G', 'Hoi An', 4.6, 'Charming hotel in ancient town');
INSERT INTO Hotels (hotelID, name, location, danhGia, moTa) VALUES
(8, 'Hotel H', 'Vung Tau', 3.9, 'Relaxing seaside retreat');
INSERT INTO Hotels (hotelID, name, location, danhGia, moTa) VALUES
(9, 'Hotel I', 'Ha Long', 4.4, 'Hotel with stunning bay views');
INSERT INTO Hotels (hotelID, name, location, danhGia, moTa) VALUES
(10, 'Hotel J', 'Phu Quoc', 4.7, 'Resort-style hotel in paradise');

-- Thêm dữ liệu mẫu cho bảng Accounts
INSERT INTO Accounts (accountID, password, sdt, userName, email) VALUES
(1, 'pass1', '0123456789', 'user1', 'user1@example.com');
INSERT INTO Accounts (accountID, password, sdt, userName, email) VALUES
(2, 'pass2', '0987654321', 'user2', 'user2@example.com');
INSERT INTO Accounts (accountID, password, sdt, userName, email) VALUES
(3, 'pass3', '0912345678', 'user3', 'user3@example.com');

-- Thêm dữ liệu mẫu cho bảng RoomTypes (mỗi khách sạn có 1 loại phòng mẫu)
INSERT INTO RoomTypes (roomTypeID, name, price, dienTich, soNguoi, bedType, bedCount, hotelID) VALUES
(1, 'Deluxe Room', 120.00, 30.0, 2, 'King', 1, 1);
INSERT INTO RoomTypes (roomTypeID, name, price, dienTich, soNguoi, bedType, bedCount, hotelID) VALUES
(2, 'Standard Room', 90.00, 25.0, 2, 'Queen', 1, 2);
INSERT INTO RoomTypes (roomTypeID, name, price, dienTich, soNguoi, bedType, bedCount, hotelID) VALUES
(3, 'Suite', 200.00, 50.0, 4, 'King', 2, 3);
INSERT INTO RoomTypes (roomTypeID, name, price, dienTich, soNguoi, bedType, bedCount, hotelID) VALUES
(4, 'Single Room', 70.00, 20.0, 1, 'Single', 1, 4);
INSERT INTO RoomTypes (roomTypeID, name, price, dienTich, soNguoi, bedType, bedCount, hotelID) VALUES
(5, 'Family Room', 150.00, 40.0, 3, 'Queen', 2, 5);
INSERT INTO RoomTypes (roomTypeID, name, price, dienTich, soNguoi, bedType, bedCount, hotelID) VALUES
(6, 'Executive Room', 130.00, 35.0, 2, 'King', 1, 6);
INSERT INTO RoomTypes (roomTypeID, name, price, dienTich, soNguoi, bedType, bedCount, hotelID) VALUES
(7, 'Deluxe Suite', 250.00, 55.0, 4, 'King', 2, 7);
INSERT INTO RoomTypes (roomTypeID, name, price, dienTich, soNguoi, bedType, bedCount, hotelID) VALUES
(8, 'Economy Room', 80.00, 22.0, 2, 'Queen', 1, 8);
INSERT INTO RoomTypes (roomTypeID, name, price, dienTich, soNguoi, bedType, bedCount, hotelID) VALUES
(9, 'Presidential Suite', 300.00, 60.0, 4, 'King', 3, 9);
INSERT INTO RoomTypes (roomTypeID, name, price, dienTich, soNguoi, bedType, bedCount, hotelID) VALUES
(10, 'Resort Room', 110.00, 28.0, 2, 'Queen', 1, 10);

-- Thêm dữ liệu mẫu cho bảng RoomTypeImages (mỗi loại phòng có 1 ảnh mẫu)
INSERT INTO RoomTypeImages (roomTypeID, imageID, pathImg) VALUES
(1, 1, 'images/room1.jpg');
INSERT INTO RoomTypeImages (roomTypeID, imageID, pathImg) VALUES
(2, 1, 'images/room2.jpg');
INSERT INTO RoomTypeImages (roomTypeID, imageID, pathImg) VALUES
(3, 1, 'images/room3.jpg');
INSERT INTO RoomTypeImages (roomTypeID, imageID, pathImg) VALUES
(4, 1, 'images/room4.jpg');
INSERT INTO RoomTypeImages (roomTypeID, imageID, pathImg) VALUES
(5, 1, 'images/room5.jpg');
INSERT INTO RoomTypeImages (roomTypeID, imageID, pathImg) VALUES
(6, 1, 'images/room6.jpg');
INSERT INTO RoomTypeImages (roomTypeID, imageID, pathImg) VALUES
(7, 1, 'images/room7.jpg');
INSERT INTO RoomTypeImages (roomTypeID, imageID, pathImg) VALUES
(8, 1, 'images/room8.jpg');
INSERT INTO RoomTypeImages (roomTypeID, imageID, pathImg) VALUES
(9, 1, 'images/room9.jpg');
INSERT INTO RoomTypeImages (roomTypeID, imageID, pathImg) VALUES
(10, 1, 'images/room10.jpg');

-- Thêm dữ liệu mẫu cho bảng Orders (một vài đơn hàng mẫu)
INSERT INTO Orders (orderID, price, roomTypeID, orderDate, checkInDate, checkOutDate, accountID) VALUES
(1, 120.00, 1, '2025-04-01', '2025-04-10', '2025-04-12', 1);
INSERT INTO Orders (orderID, price, roomTypeID, orderDate, checkInDate, checkOutDate, accountID) VALUES
(2, 90.00, 2, '2025-04-02', '2025-04-15', '2025-04-17', 2);
INSERT INTO Orders (orderID, price, roomTypeID, orderDate, checkInDate, checkOutDate, accountID) VALUES
(3, 200.00, 3, '2025-04-03', '2025-04-20', '2025-04-23', 3);

-- Thêm dữ liệu mẫu cho bảng Services
INSERT INTO Services (serviceID, name, pathImg) VALUES
(1, 'WiFi', 'images/service_wifi.jpg');
INSERT INTO Services (serviceID, name, pathImg) VALUES
(2, 'Ăn sáng', 'images/service_breakfast.jpg');
INSERT INTO Services (serviceID, name, pathImg) VALUES
(3, 'Spa', 'images/service_spa.jpg');

-- Thêm dữ liệu mẫu cho bảng Hotel_Service (liên kết dịch vụ với khách sạn)
INSERT INTO Hotel_Service (serviceID, hotelID) VALUES
(1, 1);
INSERT INTO Hotel_Service (serviceID, hotelID) VALUES
(2, 1);
INSERT INTO Hotel_Service (serviceID, hotelID) VALUES
(3, 2);
INSERT INTO Hotel_Service (serviceID, hotelID) VALUES
(1, 3);
INSERT INTO Hotel_Service (serviceID, hotelID) VALUES
(2, 4);
INSERT INTO Hotel_Service (serviceID, hotelID) VALUES
(3, 5);

-- Thêm dữ liệu mẫu cho bảng Amenities
INSERT INTO Amenities (amenityID, name, pathImg) VALUES
(1, 'TV', 'images/amenity_tv.jpg');
INSERT INTO Amenities (amenityID, name, pathImg) VALUES
(2, 'Tủ lạnh', 'images/amenity_fridge.jpg');
INSERT INTO Amenities (amenityID, name, pathImg) VALUES
(3, 'Minibar', 'images/amenity_minibar.jpg');

-- Thêm dữ liệu mẫu cho bảng Room_Amenity (liên kết tiện ích với loại phòng)
INSERT INTO Room_Amenity (roomTypeID, amenityID) VALUES
(1, 1);
INSERT INTO Room_Amenity (roomTypeID, amenityID) VALUES
(1, 2);
INSERT INTO Room_Amenity (roomTypeID, amenityID) VALUES
(2, 1);
INSERT INTO Room_Amenity (roomTypeID, amenityID) VALUES
(3, 3);
INSERT INTO Room_Amenity (roomTypeID, amenityID) VALUES
(4, 1);
INSERT INTO Room_Amenity (roomTypeID, amenityID) VALUES
(5, 2);
INSERT INTO Room_Amenity (roomTypeID, amenityID) VALUES
(6, 1);
INSERT INTO Room_Amenity (roomTypeID, amenityID) VALUES
(7, 3);
INSERT INTO Room_Amenity (roomTypeID, amenityID) VALUES
(8, 2);
INSERT INTO Room_Amenity (roomTypeID, amenityID) VALUES
(9, 1);
INSERT INTO Room_Amenity (roomTypeID, amenityID) VALUES
(10, 3);

-- Thêm dữ liệu mẫu cho bảng HotelImages (mỗi khách sạn có 1 ảnh mẫu)
INSERT INTO HotelImages (hotelID, imageID, pathImg) VALUES
(1, 1, 'images/hotel1.jpg');
INSERT INTO HotelImages (hotelID, imageID, pathImg) VALUES
(2, 1, 'images/hotel2.jpg');
INSERT INTO HotelImages (hotelID, imageID, pathImg) VALUES
(3, 1, 'images/hotel3.jpg');
INSERT INTO HotelImages (hotelID, imageID, pathImg) VALUES
(4, 1, 'images/hotel4.jpg');
INSERT INTO HotelImages (hotelID, imageID, pathImg) VALUES
(5, 1, 'images/hotel5.jpg');
INSERT INTO HotelImages (hotelID, imageID, pathImg) VALUES
(6, 1, 'images/hotel6.jpg');
INSERT INTO HotelImages (hotelID, imageID, pathImg) VALUES
(7, 1, 'images/hotel7.jpg');
INSERT INTO HotelImages (hotelID, imageID, pathImg) VALUES
(8, 1, 'images/hotel8.jpg');
INSERT INTO HotelImages (hotelID, imageID, pathImg) VALUES
(9, 1, 'images/hotel9.jpg');
INSERT INTO HotelImages (hotelID, imageID, pathImg) VALUES
(10, 1, 'images/hotel10.jpg');
