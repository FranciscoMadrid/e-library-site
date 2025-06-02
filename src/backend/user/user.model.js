import DB_Query from "../database_query.js"
import bcrypt from 'bcrypt'

const table = 'user';
const primaryKey = 'user_id'
const SALT_ROUNDS = 10;

export const getAll = async () => {
    const sql = `SELECT * FROM ${table}`
    return await DB_Query.query(sql);
}

export const getById = async (id) => {
    const sql = `SELECT * FROM ${table} WHERE ${primaryKey} = ?`
    return await DB_Query.query(sql, [id])
    .then(rows => rows[0])
}

export const getByEmail = async(email) => {
    const sql = 'SELECT * FROM user WHERE email = ?';
    return await DB_Query.query(sql, [email])
    .then(rows => rows[0])
}

export const create = async ({email, first_name, last_name, password}) =>{
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const result = await DB_Query.query(
        'INSERT INTO user (email, first_name, last_name, password_hash) VALUES (?, ?, ?, ?)',
        [email, first_name, last_name, hashedPassword]
    );

    return {message: 'User has been successfully created',details: `Email: ${email}`}
}

export const update = async(id, updatedFields) => {
    const fields = [];
    const values = [];

    for(const [key, value] of Object.entries(updatedFields)) {
        fields.push(`${key} = ?`);
        values.push(value);
    }

    if(fields.length === 0)
    {
        throw new Error('No fields provided to update');
    }

    const sql = `UPDATE ${table} SET ${fields.join(', ')} WHERE ${primaryKey} = ?`;
    values.push(id);

    const result = await DB_Query.query(sql, values);

    return result.affectedRows;
}

export const deleteById = async(id) => {
    const sql = `DELETE FROM ${table} WHERE ${primaryKey} = ?`;
    const result = await DB_Query.query(sql, id);

    return result.affectedRows
}