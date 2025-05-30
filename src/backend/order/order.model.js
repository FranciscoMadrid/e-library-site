import DB_Query from "../database_query.js"

const table = 'order';
const primaryKey = 'order_id'

export const getAll = async () => {
    const sql = `SELECT * FROM ${table}`
    return await DB_Query.query(sql);
}

export const getById = async (id) => {
    const sql = `SELECT * FROM ${table} WHERE ${primaryKey} = ?`
    return await DB_Query.query(sql, [id])
    .then(rows => rows[0])
}

export const create = async (fields) =>{
    const keys = Object.keys(fields);
    const values = Object.values(fields);

    if (keys.length === 0) {
        throw new Error('No fields provided to create');
    }

    const columns = keys.join(', ');
    const placeholders = keys.map(() => '?').join(', ');

    const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;

    const result = await DB_Query.query(sql, values);

    return { message: 'Record has been successfully created.', id: result.insertId };
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