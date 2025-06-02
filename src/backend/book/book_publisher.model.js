import DB_Query from "../database_query.js"

const table = 'publisher';
const primaryKey = 'publisher_id'

export const getAll = async () => {
    const sql = `SELECT * FROM ${table}`
    return await DB_Query.query(sql);
}

export const getById = async (id) => {
    const sql = `SELECT * FROM ${table} WHERE ${primaryKey} = ?`
    return await DB_Query.query(sql, [id])
    .then(rows => rows[0])
}

export const create = async ({publisher_name}) =>{
    const sqlPublisher = 'INSERT INTO publisher (publisher_name) VALUES (?)'
    const resultPublisher = await DB_Query.query(sqlPublisher, [publisher_name]);

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
    const sqlBookPublisher = 'DELETE FROM book_publisher WHERE fk_publisher_id = ?';
    const resultBookPublisher = await DB_Query.query(sqlBookPublisher, [id]);

    const sqlPublisher = 'DELETE FROM book_publisher WHERE publisher_id = ?';
    const resultPublisher = await DB_Query(sqlPublisher, [id])

    return { message: 'Record has been successfully deleted.'};
}