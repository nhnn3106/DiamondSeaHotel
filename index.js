import express from "express";
import mariadb from 'mariadb';

const app = express();

// Cấu hình kết nối MariaDB
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '12y34567',
    database: 'db',
    connectionLimit: 5
});

// API trả về danh sách phòng kèm loại phòng và hình ảnh và services name và amenities name
app.get("/rooms", async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();

        const query = `
            SELECT r.roomID, r.name, r.price, r.dienTich, r.soNguoi, r.bedType, r.bedCount, r.danhGia, r.moTa, r.location,
                   rt.name AS roomTypeName,
                   ri.pathImg,
                   s.serviceID, s.name AS serviceName,
                   a.amenityID, a.name AS amenityName

            FROM Rooms r
            LEFT JOIN RoomTypes rt ON r.roomTypeID = rt.roomTypeID
            LEFT JOIN RoomImages ri ON r.roomID = ri.roomID
            LEFT JOIN Room_Service rs ON r.roomID = rs.roomID
            LEFT JOIN Services s ON rs.serviceID = s.serviceID
            LEFT JOIN Room_Amenity ra ON r.roomID = ra.roomID
            LEFT JOIN Amenities a ON ra.amenityID = a.amenityID

            ORDER BY r.roomID, ri.imageID
        `;

        const rows = await connection.query(query);
        const roomsMap = new Map();

        rows.forEach(row => {
            if (!roomsMap.has(row.roomID)) {
                roomsMap.set(row.roomID, {
                    roomID: row.roomID,
                    name: row.name,
                    price: row.price,
                    dienTich: row.dienTich,
                    soNguoi: row.soNguoi,
                    bedType: row.bedType,
                    bedCount: row.bedCount,
                    danhGia: row.danhGia,
                    moTa: row.moTa,
                    location: row.location,
                    roomType: [row.roomTypeName],
                    images: [],
                    services: [],
                    amenities: []
                });
            }

            // Thêm hình ảnh nếu chưa có
            if (row.pathImg && !roomsMap.get(row.roomID).images.includes(row.pathImg)) {
                roomsMap.get(row.roomID).images.push(row.pathImg);
            }

            // Thêm service name nếu chưa có
            if (row.serviceName && !roomsMap.get(row.roomID).services.includes(row.serviceName)) {
                roomsMap.get(row.roomID).services.push(row.serviceName);
            }

            // Thêm amenity name nếu chưa có
            if (row.amenityName && !roomsMap.get(row.roomID).amenities.includes(row.amenityName)) {
                roomsMap.get(row.roomID).amenities.push(row.amenityName);
            }
        });

        const roomsList = Array.from(roomsMap.values());

        res.json(roomsList);
    } catch (error) {
        res.status(500).json(error.message);
    } finally {
        if (connection) connection.release();
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
