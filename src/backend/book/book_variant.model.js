import DB_Query from "../database_query.js"

const table = 'variant';
const primaryKey = 'variant_id'

export const getAll = async () => {
    const sql = `SELECT * FROM ${table}`
    return await DB_Query.query(sql);
}

export const getById = async (id) => {
    const sql = `SELECT * FROM ${table} WHERE ${primaryKey} = ?`
    return await DB_Query.query(sql, [id])
    .then(rows => rows[0])
}

export const create = async ({variant_name}) =>{
    const sql = 'INSERT INTO variant (variant_name) VALUES (?)';
    const result = await DB_Query.query(sql, [variant_name]);

    return { message: 'Record has been successfully created.'};
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
    const sql = "DELETE FROM book_variant WHERE book_variant_id = ?";
    const result = await DB_Query.query(sql, [id]);
    return { message: 'Record has been successfully deleted.'};
}