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

let con;
const ConnectDB = async () => {
    try {
        con = await pool.getConnection();
        console.log('Đã kết nối thành công với MariaDB!');
        return true;
    } catch (err) {
        console.error('Không thể kết nối với MariaDB:', err);
        return false;
    } finally {
        if (con) con.release();
    }
}

await ConnectDB();


app.get("/", async (req, res) => {
    try {
        const rows = await con.query('SELECT * FROM hotels');
        res.json(rows);
    } catch (error) {
        res.status(500).json(error);
    } finally {
        con.release();
    }
});




app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
