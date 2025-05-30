import DB_Query from "../database_query.js"

const table = 'book_image';
const primaryKey = 'book_image_id'

export const getAll = async () => {
    const sql = `SELECT * FROM ${table}`
    return await DB_Query.query(sql);
}

export const getById = async (id) => {
    const sql = `SELECT * FROM ${table} WHERE ${primaryKey} = ?`
    return await DB_Query.query(sql, [id])
    .then(rows => rows[0])
}

export const create = async ({book_variant_id, image_path}) =>{
    const sqlBookImage = 'INSERT INTO book_image (image_path, alt_text) VALUES (?, ?)';
    const alt_text = image_path.split('/')[-1];

    const bookImageResult = await DB_Query.query(sqlBookImage, [image_path, alt_text]);

    const sqlBookImageVariant = 'INSERT INTO book_image_variant (fk_book_variant_id, fk_book_image_id) VALUES (?, ?)';

    const bookImageVariantResult = await DB_Query.query(sqlBookImageVariant, [book_variant_id, bookImageResult.insertId]);

    return { message: 'Record has been successfully created.', id: bookImageVariantResult.insertId };
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
    const sqlBookImageVariant = 'DELETE FROM book_image_variant WHERE fk_book_image_id = ?';
    const resultBookImageVariant = await DB_Query.query(sqlBookImageVariant, [id])

    const sqlBookImage = `DELETE FROM book_image WHERE ${primaryKey} = ?`;
    const resultBookImage = await DB_Query.query(sql, [id]);

    return { message: 'Record has been successfully deleted.' };
}