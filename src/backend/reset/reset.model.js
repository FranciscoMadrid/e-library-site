import crypto from 'crypto';
import DB_Query from '../database_query.js';

const table = 'password_resets';

export const createToken = async (userId) => {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour expiration

    await DB_Query.query(
        `INSERT INTO ${table} (fk_user_id, token, expires_at) VALUES (?, ?, ?)`,
        [userId, token, expiresAt]
    );

    return token;
};

    export const getValidToken = async (token) => {
    const sql = `SELECT * FROM ${table} WHERE token = ? AND used = FALSE AND expires_at > NOW()`;
    const rows = await DB_Query.query(sql, [token]);
    return rows[0];
};

    export const markUsed = async (token) => {
    await DB_Query.query(`UPDATE ${table} SET used = TRUE WHERE token = ?`, [token]);
};
