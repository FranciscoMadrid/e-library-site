import DB_Query from "../database_query.js"

const table = 'author';
const primaryKey = 'author_id'

export const getAll = async () => {
    const sql = `SELECT * FROM ${table}`
    return await DB_Query.query(sql);
}

export const getById = async (id) => {
    const sql = `SELECT * FROM ${table} WHERE ${primaryKey} = ?`
    return await DB_Query.query(sql, [id])
    .then(rows => rows[0])
}

export const create = async ({author}) =>{
    const sqlAuthor = 'INSERT INTO author (author) VALUES (?)'
    const resultAuthor = await DB_Query.query(sqlAuthor, [author]);

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
    const sqlBookAuthor = 'DELETE FROM book_author WHERE fk_author_id = ?'
    const resultBookAuthor = await DB_Query.query(sqlBookAuthor, [id])

    const sqlAuthor = 'DELETE FROM author WHERE author_id = ?'
    const resultAuthor = await DB_Query.query(sqlAuthor, [id]);

    return { message: 'Record has been successfully deleted.'};
}