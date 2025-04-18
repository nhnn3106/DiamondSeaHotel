CREATE DATABASE db;
USE db;
CREATE TABLE Accounts (
    accountID INT PRIMARY KEY,
    password NVARCHAR(255) NOT NULL,
    sdt NVARCHAR(20),
    userName NVARCHAR(100),
    email NVARCHAR(100)
);

CREATE TABLE RoomTypes (
    roomTypeID INT PRIMARY KEY,
    name NVARCHAR(100),
    pathImg NVARCHAR(255)
);

CREATE TABLE Rooms (
    roomID INT PRIMARY KEY,
    name NVARCHAR(100),
    price DECIMAL(10,2),
    dienTich FLOAT,
    soNguoi INT,
    bedType NVARCHAR(50),
    bedCount INT,
    roomTypeID INT,
    danhGia FLOAT,
    moTa NVARCHAR(255),
    location NVARCHAR(255),
    FOREIGN KEY (roomTypeID) REFERENCES RoomTypes(roomTypeID)
);

CREATE TABLE RoomImages (
    roomID INT,
    imageID INT,
    pathImg NVARCHAR(255),
    PRIMARY KEY (roomID, imageID),
    FOREIGN KEY (roomID) REFERENCES Rooms(roomID)
);

CREATE TABLE Orders (
    orderID INT PRIMARY KEY,
    price DECIMAL(10,2),
    roomID INT,
    orderDate DATE,
    checkInDate DATE,
    checkOutDate DATE,
    accountID INT,
    name NVARCHAR(100),
    sdt NVARCHAR(20),
    email NVARCHAR(100),
    type NVARCHAR(100),
    attribute NVARCHAR(255),
    FOREIGN KEY (roomID) REFERENCES Rooms(roomID),
    FOREIGN KEY (accountID) REFERENCES Accounts(accountID)
);

CREATE TABLE Services (
    serviceID INT PRIMARY KEY,
    name NVARCHAR(100),
    pathImg NVARCHAR(255)
);

CREATE TABLE Room_Service (
    serviceID INT,
    roomID INT,
    PRIMARY KEY (serviceID, roomID),
    FOREIGN KEY (serviceID) REFERENCES Services(serviceID),
    FOREIGN KEY (roomID) REFERENCES Rooms(roomID)
);

CREATE TABLE Amenities (
    amenityID INT PRIMARY KEY,
    name NVARCHAR(100),
    pathImg NVARCHAR(255)
);

CREATE TABLE Room_Amenity (
    roomID INT,
    amenityID INT,
    PRIMARY KEY (roomID, amenityID),
    FOREIGN KEY (roomID) REFERENCES Rooms(roomID),
    FOREIGN KEY (amenityID) REFERENCES Amenities(amenityID)
);

-- Insert 2 Accounts
INSERT INTO Accounts (accountID, password, sdt, userName, email) VALUES
(1, 'password123', '0123456789', 'user1', 'user1@example.com'),
(2, 'password456', '0987654321', 'user2', 'user2@example.com');

-- Insert RoomTypes
INSERT INTO RoomTypes (roomTypeID, name, pathImg) VALUES
(1, 'Standard', '/roomtype/1.png'),
(2, 'Deluxe', '/roomtype/2.png'),
(3, 'Suite', '/roomtype/3.png'),
(4, 'Family', '/roomtype/4.png');

-- Insert 20 Rooms
INSERT INTO Rooms (roomID, name, price, dienTich, soNguoi, bedType, bedCount, roomTypeID, danhGia, moTa, location) VALUES
(1, 'Standard Room 101', 100.00, 25.5, 2, 'Double', 1, 1, 4.5, 'Cozy standard room', 'Floor 1'),
(2, 'Standard Room 102', 100.00, 25.5, 2, 'Double', 1, 1, 4.3, 'Comfortable standard room', 'Floor 1'),
(3, 'Deluxe Room 201', 200.00, 35.0, 3, 'Queen', 1, 2, 4.7, 'Spacious deluxe room', 'Floor 2'),
(4, 'Deluxe Room 202', 200.00, 35.0, 3, 'Queen', 1, 2, 4.6, 'Modern deluxe room', 'Floor 2'),
(5, 'Suite Room 301', 350.00, 50.0, 4, 'King', 1, 3, 4.9, 'Luxury suite', 'Floor 3'),
(6, 'Suite Room 302', 350.00, 50.0, 4, 'King', 1, 3, 4.8, 'Premium suite', 'Floor 3'),
(7, 'Family Room 401', 250.00, 45.0, 5, 'Double', 2, 4, 4.4, 'Spacious family room', 'Floor 4'),
(8, 'Family Room 402', 250.00, 45.0, 5, 'Double', 2, 4, 4.5, 'Comfortable family room', 'Floor 4'),
(9, 'Standard Room 103', 100.00, 25.5, 2, 'Double', 1, 1, 4.2, 'Budget standard room', 'Floor 1'),
(10, 'Standard Room 104', 100.00, 25.5, 2, 'Double', 1, 1, 4.3, 'Simple standard room', 'Floor 1'),
(11, 'Deluxe Room 203', 200.00, 35.0, 3, 'Queen', 1, 2, 4.6, 'Elegant deluxe room', 'Floor 2'),
(12, 'Deluxe Room 204', 200.00, 35.0, 3, 'Queen', 1, 2, 4.7, 'Stylish deluxe room', 'Floor 2'),
(13, 'Suite Room 303', 350.00, 50.0, 4, 'King', 1, 3, 4.9, 'Exclusive suite', 'Floor 3'),
(14, 'Suite Room 304', 350.00, 50.0, 4, 'King', 1, 3, 4.8, 'Grand suite', 'Floor 3'),
(15, 'Family Room 403', 250.00, 45.0, 5, 'Double', 2, 4, 4.5, 'Large family room', 'Floor 4'),
(16, 'Family Room 404', 250.00, 45.0, 5, 'Double', 2, 4, 4.4, 'Cozy family room', 'Floor 4'),
(17, 'Standard Room 105', 100.00, 25.0, 2, 'Double', 1, 1, 4.3, 'Basic standard room', 'Floor 1'),
(18, 'Standard Room 106', 100.00, 25.0, 2, 'Double', 1, 1, 4.2, 'Minimal standard room', 'Floor 1'),
(19, 'Deluxe Room 205', 200.00, 35.0, 3, 'Queen', 1, 2, 4.6, 'Chic deluxe room', 'Floor 2'),
(20, 'Deluxe Room 206', 200.00, 35.0, 3, 'Queen', 1, 2, 4.7, 'Modern deluxe room', 'Floor 2');

UPDATE Rooms
SET location = CASE
    -- Room IDs 1-4: United States
    WHEN roomID = 1 THEN '123 Main Street, New York, United States'
    WHEN roomID = 2 THEN '456 Oak Avenue, Los Angeles, United States'
    WHEN roomID = 3 THEN '789 Pine Road, Chicago, United States'
    WHEN roomID = 4 THEN '101 Maple Lane, Houston, United States'

    -- Room IDs 5-7: South Korea
    WHEN roomID = 5 THEN '12 Gangnam Street, Seoul, South Korea'
    WHEN roomID = 6 THEN '34 Itaewon Road, Busan, South Korea'
    WHEN roomID = 7 THEN '56 Myeongdong Avenue, Incheon, South Korea'

    -- Room IDs 8-10: Australia
    WHEN roomID = 8 THEN '78 Collins Street, Melbourne, Australia'
    WHEN roomID = 9 THEN '90 George Street, Sydney, Australia'
    WHEN roomID = 10 THEN '11 Queen Street, Brisbane, Australia'

    -- Room IDs 11-13: Thailand
    WHEN roomID = 11 THEN '22 Sukhumvit Road, Bangkok, Thailand'
    WHEN roomID = 12 THEN '33 Chiang Mai Street, Chiang Mai, Thailand'
    WHEN roomID = 13 THEN '44 Phuket Avenue, Phuket, Thailand'

    -- Room IDs 14-16: France
    WHEN roomID = 14 THEN '55 Champs-Élysées, Paris, France'
    WHEN roomID = 15 THEN '66 Rue de Rivoli, Lyon, France'
    WHEN roomID = 16 THEN '77 Avenue Montaigne, Nice, France'

    -- Room IDs 17-20: Italy
    WHEN roomID = 17 THEN '88 Via Roma, Rome, Italy'
    WHEN roomID = 18 THEN '99 Via Veneto, Venice, Italy'
    WHEN roomID = 19 THEN '111 Via Dante, Milan, Italy'
    WHEN roomID = 20 THEN '222 Via Toledo, Naples, Italy'
END;

-- Insert 5 images per room (100 images total)
INSERT INTO RoomImages (roomID, imageID, pathImg) VALUES
-- Room 1
(1, 1, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744903319/22_exibll.png'), (1, 2, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744904145/1_wfwphh.png'), (1, 3, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744907569/3_dq2ryz.jpg'), (1, 4, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744907660/4_h6eyzg.jpg'), (1, 5, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744907676/5_saxecu.jpg'),
-- Room 2
(2, 1, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744907694/6_dxke7n.jpg'), (2, 2, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744907709/7_ymhfrx.jpg'), (2, 3, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744907730/8_ly0y1l.jpg'), (2, 4, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744907743/9_zysdyn.jpg'), (2, 5, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744907758/10_f9v48s.jpg'),
-- Room 3
(3, 1, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744907773/11_ufjga4.jpg'), (3, 2, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744907789/12_fnhhoc.jpg'), (3, 3, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744907811/13_syem2t.jpg'), (3, 4, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744907829/14_sgjptr.jpg'), (3, 5, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744907842/15_h5kfft.jpg'),
-- Room 4
(4, 1, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744907861/16_go9i10.jpg'), (4, 2, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744907876/17_xwau4l.jpg'), (4, 3, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744907893/18_rko2f8.jpg'), (4, 4, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744907911/19_ixvk4c.jpg'), (4, 5, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744907957/20_ykwmeq.jpg'),
-- Room 5
(5, 1, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744909689/21_liiw4n.jpg'), (5, 2, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744908066/22_dh2pcq.jpg'), (5, 3, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744908092/23_nte0fc.jpg'), (5, 4, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744908121/24_reuuww.jpg'), (5, 5, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744908137/25_pqvwxu.jpg'),
-- Room 6
(6, 1, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744908188/26_sukwtn.jpg'), (6, 2, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744908209/27_o2zb72.jpg'), (6, 3, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744908226/28_wsg1tr.jpg'), (6, 4, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744908250/29_bvazqc.jpg'), (6, 5, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744908273/30_whvksi.jpg'),
-- Room 7
(7, 1, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744909724/31_a7ebe3.jpg'), (7, 2, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744909752/32_q63lcd.jpg'), (7, 3, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744908343/33_egblix.jpg'), (7, 4, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744908373/34_zxnqqh.jpg'), (7, 5, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744908391/35_u7xsrf.jpg'),
-- Room 8
(8, 1, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744908413/36_sugh1v.jpg'), (8, 2, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744908453/37_jqbmos.jpg'), (8, 3, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744908474/38_qujkhy.jpg'), (8, 4, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744908495/39_se84ta.jpg'), (8, 5, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744908530/40_hfdrs7.jpg'),
-- Room 9
(9, 1, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744909771/41_frkyrk.jpg'), (9, 2, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744908566/42_fw8wnk.jpg'), (9, 3, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744908587/43_d1wywf.jpg'), (9, 4, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744908604/44_wyhrbg.jpg'), (9, 5, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744908622/45_os3zzs.jpg'),
-- Room 10
(10, 1, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744908642/46_iovr1y.jpg'), (10, 2, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744908660/47_cls1bm.jpg'), (10, 3, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744908678/48_omrq88.jpg'), (10, 4, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744908696/49_ecy0k7.jpg'), (10, 5, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744909794/50_cnnjpk.jpg'),
-- Room 11
(11, 1, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744908737/51_rvfce1.jpg'), (11, 2, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744909818/52_jwtwgm.jpg'), (11, 3, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744908793/53_sf0p7m.jpg'), (11, 4, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744908824/54_bre5jg.jpg'), (11, 5, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744908851/55_akcstk.jpg'),
-- Room 12
(12, 1, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744908872/56_hfbmr3.jpg'), (12, 2, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744908891/57_gc80ft.jpg'), (12, 3, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744908913/58_rpyvfa.jpg'), (12, 4, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744908932/59_ldkyem.jpg'), (12, 5, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744908952/60_gsllxe.jpg'),
-- Room 13
(13, 1, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744908990/61_occ6co.jpg'), (13, 2, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744909013/62_isknn6.jpg'), (13, 3, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744909038/63_psxwpe.jpg'), (13, 4, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744909063/64_a9cvol.jpg'), (13, 5, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744909082/65_wizfc1.jpg'),
-- Room 14
(14, 1, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744909116/66_ev0ktg.jpg'), (14, 2, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744909133/67_tbt1w4.jpg'), (14, 3, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744909152/68_cmgmze.jpg'), (14, 4, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744909172/69_r7lmjz.jpg'), (14, 5, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744909193/70_tuvm8h.jpg'),
-- Room 15
(15, 1, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744909215/71_i6wb7s.jpg'), (15, 2, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744909235/72_nppkhi.jpg'), (15, 3, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744909253/73_gjgdnq.jpg'), (15, 4, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744909274/74_emypii.jpg'), (15, 5, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744909296/95_pul60y.jpg'),
-- Room 16
(16, 1, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744909318/76_kaxt32.jpg'), (16, 2, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744909337/77_jiyun8.jpg'), (16, 3, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744909360/78_tze7cm.jpg'), (16, 4, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744909380/79_qfyyyl.jpg'), (16, 5, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744909410/80_pz2qlj.jpg'),
-- Room 17
(17, 1, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744951605/81_dmy1u5.jpg'), (17, 2, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744951624/82_k1wyoi.jpg'), (17, 3, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744951648/83_t7hzhw.jpg'), (17, 4, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744951670/84_f0jnrf.jpg'), (17, 5, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744951697/85_gjbnlh.jpg'),
-- Room 18
(18, 1, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744951721/86_ewd8kq.jpg'), (18, 2, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744951741/87_witurl.jpg'), (18, 3, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744951760/88_hd2rph.jpg'), (18, 4, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744951787/89_mwz746.jpg'), (18, 5, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744951806/90_fgxins.jpg'),
-- Room 19
(19, 1, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744951836/91_kptlqj.jpg'), (19, 2, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744951859/92_vapbnl.jpg'), (19, 3, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744951877/93_lfbt0s.jpg'), (19, 4, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744951895/95_wmmuml.jpg'), (19, 5, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744951895/95_wmmuml.jpg'),
-- Room 20
(20, 1, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744951932/96_uhrgce.jpg'), (20, 2, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744951960/97_wspebi.jpg'), (20, 3, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744951978/98_lmscjq.jpg'), (20, 4, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744952000/99_ks8g8n.jpg'), (20, 5, 'https://res.cloudinary.com/derrryb5t/image/upload/v1744952044/100_lfmujr.jpg');

-- Insert Services
INSERT INTO Services (serviceID, name, pathImg) VALUES
(1, 'Wi-Fi', '/service/1.png'),
(2, 'Breakfast', '/service/2.png'),
(3, 'Parking', '/service/3.png'),
(4, 'Gym', '/service/4.png'),
(5, 'Spa', '/service/5.png'),
(6, 'Pool', '/service/6.png');

-- Insert Room_Service (each room has 2-4 services)
INSERT INTO Room_Service (serviceID, roomID) VALUES
(1, 1), (2, 1), (3, 1),
(1, 2), (2, 2), (4, 2),
(1, 3), (2, 3), (5, 3), (6, 3),
(1, 4), (2, 4), (3, 4), (4, 4),
(1, 5), (2, 5), (5, 5),
(1, 6), (2, 6), (6, 6),
(1, 7), (2, 7), (3, 7), (4, 7),
(1, 8), (2, 8), (5, 8),
(1, 9), (2, 9), (3, 9),
(1, 10), (2, 10), (4, 10),
(1, 11), (2, 11), (5, 11), (6, 11),
(1, 12), (2, 12), (3, 12),
(1, 13), (2, 13), (4, 13), (5, 13),
(1, 14), (2, 14), (6, 14),
(1, 15), (2, 15), (3, 15), (4, 15),
(1, 16), (2, 16), (5, 16),
(1, 17), (2, 17), (3, 17),
(1, 18), (2, 18), (4, 18),
(1, 19), (2, 19), (5, 19), (6, 19),
(1, 20), (2, 20), (3, 20);

-- Insert Amenities
INSERT INTO Amenities (amenityID, name, pathImg) VALUES
(1, 'Air Conditioning', '/amenity/1.png'),
(2, 'TV', '/amenity/2.png'),
(3, 'Minibar', '/amenity/3.png'),
(4, 'Safe', '/amenity/4.png'),
(5, 'Hairdryer', '/amenity/5.png');

-- Insert Room_Amenity (each room has 3-5 amenities)
INSERT INTO Room_Amenity (roomID, amenityID) VALUES
(1, 1), (1, 2), (1, 3),
(2, 1), (2, 2), (2, 4),
(3, 1), (3, 2), (3, 3), (3, 4), (3, 5),
(4, 1), (4, 2), (4, 3), (4, 4),
(5, 1), (5, 2), (5, 3), (5, 4), (5, 5),
(6, 1), (6, 2), (6, 3), (6, 4),
(7, 1), (7, 2), (7, 3), (7, 4), (7, 5),
(8, 1), (8, 2), (8, 3), (8, 4),
(9, 1), (9, 2), (9, 3),
(10, 1), (10, 2), (10, 4),
(11, 1), (11, 2), (11, 3), (11, 4), (11, 5),
(12, 1), (12, 2), (12, 3), (12, 4),
(13, 1), (13, 2), (13, 3), (13, 4), (13, 5),
(14, 1), (14, 2), (14, 3), (14, 4),
(15, 1), (15, 2), (15, 3), (15, 4), (15, 5),
(16, 1), (16, 2), (16, 3), (16, 4),
(17, 1), (17, 2), (17, 3),
(18, 1), (18, 2), (18, 4),
(19, 1), (19, 2), (19, 3), (19, 4), (19, 5),
(20, 1), (20, 2), (20, 3), (20, 4);


UPDATE Rooms
SET location = CASE
    -- Room IDs 1-4: United States
    WHEN roomID = 1 THEN '123 Main Street, New York, United States'
    WHEN roomID = 2 THEN '456 Oak Avenue, Los Angeles, United States'
    WHEN roomID = 3 THEN '789 Pine Road, Chicago, United States'
    WHEN roomID = 4 THEN '101 Maple Lane, Houston, United States'

    -- Room IDs 5-7: South Korea
    WHEN roomID = 5 THEN '12 Gangnam Street, Seoul, South Korea'
    WHEN roomID = 6 THEN '34 Itaewon Road, Busan, South Korea'
    WHEN roomID = 7 THEN '56 Myeongdong Avenue, Incheon, South Korea'

    -- Room IDs 8-10: Australia
    WHEN roomID = 8 THEN '78 Collins Street, Melbourne, Australia'
    WHEN roomID = 9 THEN '90 George Street, Sydney, Australia'
    WHEN roomID = 10 THEN '11 Queen Street, Brisbane, Australia'

    -- Room IDs 11-13: Thailand
    WHEN roomID = 11 THEN '22 Sukhumvit Road, Bangkok, Thailand'
    WHEN roomID = 12 THEN '33 Chiang Mai Street, Chiang Mai, Thailand'
    WHEN roomID = 13 THEN '44 Phuket Avenue, Phuket, Thailand'

    -- Room IDs 14-16: France
    WHEN roomID = 14 THEN '55 Champs-Élysées, Paris, France'
    WHEN roomID = 15 THEN '66 Rue de Rivoli, Lyon, France'
    WHEN roomID = 16 THEN '77 Avenue Montaigne, Nice, France'

    WHEN roomID = 17 THEN '88 Via Roma, Rome, France'
    WHEN roomID = 18 THEN '99 Via Veneto, Venice, United States'
    WHEN roomID = 19 THEN '111 Via Dante, Milan, Thailand'
    WHEN roomID = 20 THEN '222 Via Toledo, Naples, Australia'
END;

