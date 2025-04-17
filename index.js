import express from "express";
import mariadb from 'mariadb';
import  cors from "cors";
const app = express();

// Cấu hình kết nối MariaDB
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'db',
    connectionLimit: 5
});

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }));


// API trả về danh sách các locations
app.get("/locations", async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();

        const query = `
            SELECT DISTINCT TRIM(SUBSTRING_INDEX(location, ',', -1)) AS country
            FROM rooms;
        `;

        const rows = await connection.query(query);

        res.json(rows);
    } catch (error) {
        res.status(500).json(error.message);
    } finally {
        if (connection) connection.release();
    }
});

// API trả về danh sách tiện nghi
app.get("/amenities", async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();

        const query = `
            SELECT * FROM amenities
        `;

        const rows = await connection.query(query);

        res.json(rows);
    } catch (error) {
        res.status(500).json(error.message);
    } finally {
        if (connection) connection.release();
    }
});



// API trả về danh sách tiện nghi
app.get("/services", async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();

        const query = `
            SELECT * FROM services
        `;

        const rows = await connection.query(query);

        res.json(rows);
    } catch (error) {
        res.status(500).json(error.message);
    } finally {
        if (connection) connection.release();
    }
});

// API trả về danh sách loại phòng
app.get("/roomtypes", async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();

        const query = `
            SELECT roomTypeID, NAME, pathImg FROM roomtypes
        `;

        const rows = await connection.query(query);

        res.json(rows);
    } catch (error) {
        res.status(500).json(error.message);
    } finally {
        if (connection) connection.release();
    }
});

// API trả về danh sách phòng kèm loại phòng và hình ảnh và services name và amenities name
app.get("/rooms", async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();

        const query = `
            SELECT r.roomID, r.price, r.bedType, r.bedCount, location,
	               rt.name AS roomTypeName,
		           ri.imageID, ri.pathImg, 
		           s.serviceID AS serviceID, s.name AS serviceName,
		           a.amenityID AS amenityID, a.name AS amenityName  
            FROM rooms r   JOIN roomtypes rt ON r.roomTypeID=rt.roomTypeID 
                           JOIN roomimages ri ON r.roomID=ri.roomID
                           JOIN room_service rs ON r.roomID=rs.roomID JOIN services s ON rs.serviceID=s.serviceID
                           JOIN room_amenity ra ON r.roomID=ra.roomID JOIN amenities a ON ra.amenityID=a.amenityID
        `;

        const rows = await connection.query(query);
        const roomsMap = new Map();

        rows.forEach(row => {
            if (!roomsMap.has(row.roomID)) {
                roomsMap.set(row.roomID, {
                    roomID: row.roomID,
                    price: row.price,
                    bedType: row.bedType,
                    bedCount: row.bedCount,
                    location: row.location,
                    roomTypeName: row.roomTypeName,
                    images: [],
                    services: [],
                    amenities: []
                });
            }

            const room = roomsMap.get(row.roomID);

            // Thêm hình ảnh nếu chưa có
            if (row.pathImg && !room.images.some(img => img.imageID === row.imageID)) {
                room.images.push({ imageID: row.imageID, pathImg: row.pathImg });
            }

            // Thêm service name nếu chưa có
            if (row.serviceName && !room.services.includes(row.serviceName)) {
                room.services.push(row.serviceName);
            }

            // Thêm amenity name nếu chưa có
            if (row.amenityName && !room.amenities.includes(row.amenityName)) {
                room.amenities.push(row.amenityName);
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

