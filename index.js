import express from "express";
import mariadb from 'mariadb';
import cors from "cors";

const app = express();
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'sapassword',
    database: 'db',
    connectionLimit: 5
});

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(express.json());

// Helper function to execute queries
const executeQuery = async (query, params = []) => {
    const connection = await pool.getConnection();
    try {
        return await connection.query(query, params);
    } finally {
        connection.release();
    }
};

// Helper function to handle errors
const handleError = (res, error, message = "Có lỗi xảy ra") => {
    console.error(message, error);
    res.status(500).json({ success: false, message: error.message });
};

// API endpoints
app.get("/locations", async (req, res) => {
    try {
        const rows = await executeQuery(`
            SELECT DISTINCT TRIM(SUBSTRING_INDEX(location, ',', -1)) AS country
            FROM rooms
        `);
        res.json(rows);
    } catch (error) {
        handleError(res, error);
    }
});

app.get("/amenities", async (req, res) => {
    try {
        const rows = await executeQuery("SELECT * FROM amenities");
        res.json(rows);
    } catch (error) {
        handleError(res, error);
    }
});

app.get("/services", async (req, res) => {
    try {
        const rows = await executeQuery("SELECT * FROM services");
        res.json(rows);
    } catch (error) {
        handleError(res, error);
    }
});

app.get("/roomtypes", async (req, res) => {
    try {
        const rows = await executeQuery("SELECT roomTypeID, NAME, pathImg FROM roomtypes");
        res.json(rows);
    } catch (error) {
        handleError(res, error);
    }
});

app.get("/rooms", async (req, res) => {
    try {
        const rows = await executeQuery(`
            SELECT r.*,
                   rt.name AS roomTypeName,
                   ri.imageID, ri.pathImg, 
                   s.serviceID AS serviceID, s.name AS serviceName,
                   a.amenityID AS amenityID, a.name AS amenityName  
            FROM rooms r 
            JOIN roomtypes rt ON r.roomTypeID=rt.roomTypeID 
            JOIN roomimages ri ON r.roomID=ri.roomID
            JOIN room_service rs ON r.roomID=rs.roomID 
            JOIN services s ON rs.serviceID=s.serviceID
            JOIN room_amenity ra ON r.roomID=ra.roomID 
            JOIN amenities a ON ra.amenityID=a.amenityID
        `);

        const roomsMap = new Map();
        rows.forEach(row => {
            if (!roomsMap.has(row.roomID)) {
                roomsMap.set(row.roomID, {
                    name: row.name,
                    roomID: row.roomID,
                    price: row.price,
                    soNguoi: row.soNguoi,
                    dienTich: row.dienTich,
                    bedType: row.bedType,
                    bedCount: row.bedCount,
                    location: row.location,
                    roomTypeName: row.roomTypeName,
                    danhGia: row.danhGia,
                    images: [],
                    services: [],
                    amenities: []
                });
            }

            const room = roomsMap.get(row.roomID);
            if (row.pathImg && !room.images.some(img => img.imageID === row.imageID)) {
                room.images.push({ imageID: row.imageID, pathImg: row.pathImg });
            }
            if (row.serviceName && !room.services.includes(row.serviceName)) {
                room.services.push(row.serviceName);
            }
            if (row.amenityName && !room.amenities.includes(row.amenityName)) {
                room.amenities.push(row.amenityName);
            }
        });

        res.json(Array.from(roomsMap.values()));
    } catch (error) {
        handleError(res, error);
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const rows = await executeQuery(`
            SELECT accountID, password, userName, email, sdt
            FROM Accounts 
            WHERE email = ? AND password = ?
        `, [email, password]);

        if (rows.length > 0) {
            res.json({
                success: true,
                user: {
                    accountID: rows[0].accountID,
                    userName: rows[0].userName,
                    email: rows[0].email,
                    sdt: rows[0].sdt || null
                }
            });
        } else {
            res.status(401).json({
                success: false,
                message: "Email hoặc mật khẩu không chính xác"
            });
        }
    } catch (error) {
        handleError(res, error);
    }
});

app.post("/register", async (req, res) => {
    const { userName, email, password } = req.body;
    try {
        const [checkResult] = await executeQuery(
            "SELECT COUNT(*) as count FROM Accounts WHERE email = ?",
            [email]
        );

        if (checkResult.count > 0) {
            return res.status(400).json({
                success: false,
                message: "Email đã được sử dụng"
            });
        }

        const [maxIdResult] = await executeQuery("SELECT MAX(accountID) as maxId FROM Accounts");
        const newId = (maxIdResult.maxId || 0) + 1;

        await executeQuery(`
            INSERT INTO Accounts (accountID, userName, email, password)
            VALUES (?, ?, ?, ?)
        `, [newId, userName, email, password]);

        res.status(201).json({
            success: true,
            message: "Đăng ký thành công"
        });
    } catch (error) {
        handleError(res, error);
    }
});

app.get('/order/:accountID', async (req, res) => {
    const { accountID } = req.params;
    if (!accountID) {
        return res.status(400).json({
            success: false,
            message: "Vui lòng cung cấp ID tài khoản"
        });
    }

    try {
        const rows = await executeQuery(`
            SELECT 
                o.orderID, o.price, o.roomID, o.orderDate, o.checkInDate, o.checkOutDate, 
                o.accountID, o.name, o.sdt, o.email, o.type, o.attribute,
                r.name AS roomName, r.price AS roomPrice, r.dienTich, r.soNguoi, r.bedType, r.bedCount, 
                r.roomTypeID, r.danhGia, r.moTa, r.location,
                rt.name AS roomTypeName, rt.pathImg AS roomTypeImg,
                ri.imageID, ri.pathImg AS roomImage,
                s.serviceID, s.name AS serviceName, s.pathImg AS serviceImg,
                a.amenityID, a.name AS amenityName, a.pathImg AS amenityImg
            FROM Orders o
            INNER JOIN Rooms r ON o.roomID = r.roomID
            INNER JOIN RoomTypes rt ON r.roomTypeID = rt.roomTypeID
            LEFT JOIN RoomImages ri ON r.roomID = ri.roomID
            LEFT JOIN Room_Service rs ON r.roomID = rs.roomID
            LEFT JOIN Services s ON rs.serviceID = s.serviceID
            LEFT JOIN Room_Amenity ra ON r.roomID = ra.roomID
            LEFT JOIN Amenities a ON ra.amenityID = a.amenityID
            WHERE o.accountID = ?
            ORDER BY o.orderDate DESC
        `, [accountID]);

        if (!rows || rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy đơn đặt phòng nào cho tài khoản này"
            });
        }

        const ordersMap = new Map();
        for (const row of rows) {
            const {
                orderID, price, roomID, orderDate, checkInDate, checkOutDate, accountID, name, sdt, email, type, attribute,
                roomName, roomPrice, dienTich, soNguoi, bedType, bedCount, roomTypeID, danhGia, moTa, location,
                roomTypeName, roomTypeImg, imageID, roomImage, serviceID, serviceName, serviceImg, amenityID, amenityName, amenityImg
            } = row;

            if (!ordersMap.has(orderID)) {
                ordersMap.set(orderID, {
                    orderID,
                    price,
                    roomID,
                    orderDate,
                    checkInDate,
                    checkOutDate,
                    accountID,
                    name,
                    sdt,
                    email,
                    type,
                    attribute,
                    room: {
                        roomID,
                        name: roomName,
                        price: roomPrice,
                        dienTich,
                        soNguoi,
                        bedType,
                        bedCount,
                        roomTypeID,
                        danhGia,
                        moTa,
                        location,
                        roomType: { roomTypeName, roomTypeImg },
                        images: [],
                        services: [],
                        amenities: []
                    }
                });
            }

            const order = ordersMap.get(orderID);
            if (imageID && !order.room.images.includes(roomImage)) {
                order.room.images.push(roomImage);
            }
            if (serviceID && !order.room.services.includes(serviceImg)) {
                order.room.services.push(serviceImg);
            }
            if (amenityID && !order.room.amenities.includes(amenityName)) {
                order.room.amenities.push(amenityName);
            }
        }

        res.json({
            success: true,
            message: "Lấy danh sách đơn đặt phòng thành công",
            data: Array.from(ordersMap.values())
        });
    } catch (error) {
        handleError(res, error);
    }
});

app.post('/order', async (req, res) => {
    try {
        const {
            orderID, price, roomID, orderDate, checkInDate, checkOutDate,
            accountID, name, email, sdt, type
        } = req.body;

        await executeQuery(`
            INSERT INTO Orders (
                orderID, accountID, roomID, price, orderDate,
                checkInDate, checkOutDate, name, email, sdt, type
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [orderID, accountID, roomID, price, orderDate, checkInDate, checkOutDate, name, email, sdt, type]);

        res.status(201).json({
            success: true,
            message: 'Order created successfully'
        });
    } catch (error) {
        handleError(res, error);
    }
});

app.delete('/order/:orderID', async (req, res) => {
    const { orderID } = req.params;
    if (!orderID) {
        return res.status(400).json({
            success: false,
            message: "Vui lòng cung cấp ID đơn đặt phòng"
        });
    }

    try {
        const [order] = await executeQuery(`
            SELECT checkInDate 
            FROM Orders 
            WHERE orderID = ?
        `, [orderID]);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy đơn đặt phòng"
            });
        }

        const checkInDate = new Date(order.checkInDate);
        const currentDate = new Date();

        if (checkInDate <= currentDate) {
            return res.status(400).json({
                success: false,
                message: "Không thể hủy đơn đặt phòng vì đã quá thời gian cho phép"
            });
        }

        await executeQuery(`
            DELETE FROM Orders 
            WHERE orderID = ?
        `, [orderID]);

        res.json({
            success: true,
            message: "Hủy đơn đặt phòng thành công"
        });
    } catch (error) {
        handleError(res, error);
    }
});

app.put("/accounts/update", async (req, res) => {
    const { accountID, userName, sdt } = req.body;
    if (!accountID || !userName || !sdt) {
        return res.status(400).json({
            success: false,
            message: "Vui lòng điền đầy đủ thông tin"
        });
    }

    try {
        const [existingAccount] = await executeQuery(
            "SELECT * FROM Accounts WHERE accountID = ?",
            [accountID]
        );

        if (existingAccount.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy tài khoản"
            });
        }

        await executeQuery(
            "UPDATE Accounts SET userName = ?, sdt = ? WHERE accountID = ?",
            [userName, sdt, accountID]
        );

        res.json({
            success: true,
            message: "Cập nhật thông tin thành công"
        });
    } catch (error) {
        handleError(res, error);
    }
});

app.put("/accounts/change-password", async (req, res) => {
    const { accountID, currentPassword, newPassword } = req.body;
    if (!accountID || !currentPassword || !newPassword) {
        return res.status(400).json({
            success: false,
            message: "Vui lòng điền đầy đủ thông tin"
        });
    }

    try {
        const [account] = await executeQuery(
            "SELECT * FROM Accounts WHERE accountID = ? AND password = ?",
            [accountID, currentPassword]
        );

        if (account.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Mật khẩu hiện tại không chính xác"
            });
        }

        await executeQuery(
            "UPDATE Accounts SET password = ? WHERE accountID = ?",
            [newPassword, accountID]
        );

        res.json({
            success: true,
            message: "Đổi mật khẩu thành công"
        });
    } catch (error) {
        handleError(res, error);
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

