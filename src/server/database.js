import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); 

const pool = await mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

try {
    const connection = await pool.getConnection();
    console.log(`✅ Connected to MySQL Database: ${process.env.DB_NAME}`);
    connection.release();
} catch (err) {
    console.error('❌ Error connecting to the database:', err);
    process.exit(1);
}

export default pool;