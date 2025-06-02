import DB_Query from "../database_query.js"

const table = 'category';
const primaryKey = 'category_id'

export const getAll = async () => {
    const sql = `SELECT * FROM ${table}`
    return await DB_Query.query(sql);
}

export const getById = async (id) => {
    const sql = `SELECT * FROM ${table} WHERE ${primaryKey} = ?`
    return await DB_Query.query(sql, [id])
    .then(rows => rows[0])
}

export const create = async ({category}) =>{
    const sqlCategory = 'INSERT INTO category (category) VALUES (?)';
    const resultCategory = await DB_Query.query(sqlCategory, [category]);

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
    const sqlBookCategory = 'DELETE FROM book_category WHERE fk_Category_id = ?';
    const resultBookCategory = await DB_Query.query(sqlBookCategory, [id]);

    const sqlCategory = 'DELETE FROM category WHERE category_id = ?';
    const resultCategory = await DB_Query(sqlCategory, [id]);

    return { message: 'Record has been successfully deleted.'};
}