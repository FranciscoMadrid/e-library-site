import DB_Query from "../database_query.js"

const table = 'book';
const primaryKey = 'book_id'

export const getAll = async ({ limit = 10, page = 1, searchTerm = '', orderDesc = false }) => {
    orderDesc = orderDesc === true || orderDesc === 'true';
    const orderBy = orderDesc ? 'DESC' : 'ASC';

    const offset = (page - 1) * limit;
    const bookParams = [];
    let whereAdded = false;

    let bookSql = `SELECT DISTINCT b.book_id FROM book AS b
        INNER JOIN book_category AS bc ON b.book_id = bc.fk_book_id
        INNER JOIN category AS c ON bc.fk_category_id = c.category_id
        INNER JOIN book_author AS ba ON ba.fk_book_id = b.book_id
        INNER JOIN author AS a ON a.author_id = ba.fk_author_id
        INNER JOIN book_variant as bv ON bv.fk_book_id = b.book_id
        INNER JOIN variant as v ON v.variant_id = bv.fk_variant_id
        INNER JOIN book_publisher AS bp ON bp.fk_book_id = b.book_id
        INNER JOIN publisher AS p ON bp.fk_publisher_id = p.publisher_id`;

    if (searchTerm) {
        bookSql += ' WHERE (b.title LIKE ? OR v.variant_name LIKE ? OR p.publisher_name LIKE ? OR c.category LIKE ? OR a.author LIKE ?)';
        const likeTerm = `%${searchTerm}%`;
        bookParams.push(likeTerm, likeTerm, likeTerm, likeTerm, likeTerm);
        whereAdded = true;
    }

    bookSql += ` GROUP BY b.book_id ORDER BY b.book_id ${orderBy} LIMIT ? OFFSET ?`;
    bookParams.push(limit, offset);

    const resBooks = await DB_Query.query(bookSql, bookParams);
    const bookIds = resBooks.map(book => book.book_id);

    if (bookIds.length === 0) {
        return [];
    }

    const placeholders = bookIds.map(() => '?').join(',');

    const sqlBookDetails = `
        SELECT * FROM book as b
        INNER JOIN book_category as bc ON b.book_id = bc.fk_book_id
        INNER JOIN category as c on bc.fk_category_id = c.category_id
        INNER JOIN book_author as ba ON ba.fk_book_id = b.book_id
        INNER JOIN author as a ON a.author_id = ba.fk_author_id
        INNER JOIN book_publisher as bp ON bp.fk_book_id = b.book_id
        INNER JOIN publisher as p ON bp.fk_publisher_id = p.publisher_id
        INNER JOIN book_variant as bv ON bv.fk_book_id = b.book_id
        INNER JOIN variant as v ON v.variant_id = bv.fk_variant_id
        INNER JOIN book_image_variant as biv ON biv.fk_book_variant_id = bv.book_variant_id
        INNER JOIN book_image as bi ON bi.book_image_id = biv.fk_book_image_id
        WHERE b.book_id IN (${placeholders})
        ORDER BY b.book_id ${orderBy}
    `;

    const paramsBookDetails = [...bookIds];

    return await DB_Query.query(sqlBookDetails, paramsBookDetails);
};

export const countBooks = async ({ searchTerm = '' }) => {
    const params = [];
    let sql = `SELECT COUNT(DISTINCT b.book_id) as total FROM book AS b
        INNER JOIN book_category AS bc ON b.book_id = bc.fk_book_id
        INNER JOIN book_variant AS bv ON bv.fk_book_id = b.book_id
        INNER JOIN variant AS v ON v.variant_id = bv.fk_variant_id
        INNER JOIN category AS c ON bc.fk_category_id = c.category_id
        INNER JOIN book_author AS ba ON ba.fk_book_id = b.book_id
        INNER JOIN author AS a ON a.author_id = ba.fk_author_id
        INNER JOIN book_publisher AS bp ON bp.fk_book_id = b.book_id
        INNER JOIN publisher AS p ON bp.fk_publisher_id = p.publisher_id`;

    if (searchTerm) {
        sql += ` WHERE (b.title LIKE ? OR v.variant_name LIKE ? OR p.publisher_name LIKE ? OR c.category LIKE ? OR a.author LIKE ?)`;
        const likeTerm = `%${searchTerm}%`;
        params.push(likeTerm, likeTerm, likeTerm, likeTerm, likeTerm);
    }

    const result = await DB_Query.query(sql, params);
    return result[0].total;
};

export const getById = async (id) => {
    const sql = `SELECT 
        *
        FROM book b
        LEFT JOIN book_category bc ON bc.fk_book_id = b.book_id
        LEFT JOIN category c ON c.category_id = bc.fk_category_id
        LEFT JOIN book_publisher bp ON bp.fk_book_id = b.book_id
        LEFT JOIN publisher p ON p.publisher_id = bp.fk_publisher_id
        LEFT JOIN book_author ba ON ba.fk_book_id = b.book_id
        LEFT JOIN author a ON a.author_id = ba.fk_author_id
        LEFT JOIN book_variant bv ON bv.fk_book_id = b.book_id
        LEFT JOIN variant v ON v.variant_id = bv.fk_variant_id
        LEFT JOIN book_image_variant biv ON biv.fk_book_variant_id = bv.book_variant_id
        LEFT JOIN book_image bi ON bi.book_image_id = biv.fk_book_image_id
        WHERE b.book_id = ?`
    return await DB_Query.query(sql, [id])
}

export const getByBookVariantID = async (id) => {
        const sql = `SELECT DISTINCT * FROM book b
        LEFT JOIN book_category bc ON bc.fk_book_id = b.book_id
        LEFT JOIN category c ON c.category_id = bc.fk_category_id
        LEFT JOIN book_publisher bp ON bp.fk_book_id = b.book_id
        LEFT JOIN publisher p ON p.publisher_id = bp.fk_publisher_id
        LEFT JOIN book_author ba ON ba.fk_book_id = b.book_id
        LEFT JOIN author a ON a.author_id = ba.fk_author_id
        LEFT JOIN book_variant bv ON bv.fk_book_id = b.book_id
        LEFT JOIN variant v ON v.variant_id = bv.fk_variant_id
        LEFT JOIN book_image_variant biv ON biv.fk_book_variant_id = bv.book_variant_id
        LEFT JOIN book_image bi ON bi.book_image_id = biv.fk_book_image_id
        WHERE bv.book_variant_id = ?`
    return await DB_Query.query(sql, [id])
}

export const create = async ({ title, publication_date, publisher = [], author = [], category = [], variant = [], image = [] }) => {
    const sqlBook = 'INSERT INTO book (title, publication_date) VALUES (?, ?)';
    const resBook = await DB_Query.query(sqlBook, [title, publication_date]);

    const sqlBookPublisher = 'INSERT INTO book_publisher (fk_book_id, fk_publisher_id) VALUES (?, ?)';
    const sqlBookAuthor = 'INSERT INTO book_author (fk_book_id, fk_author_id) VALUES (?, ?)';
    const sqlBookCategory = 'INSERT INTO book_category (fk_book_id, fk_category_id) VALUES (?, ?)';
    const sqlBookVariant = 'INSERT INTO book_variant (fk_book_id, fk_variant_id, price) VALUES (?, ?, ?)';
    const sqlBookImage = 'INSERT INTO book_image (image_path, alt_text) VALUES (?, ?)';
    const sqlBookImageVariant = 'INSERT INTO book_image_variant (fk_book_variant_id, fk_book_image_id) VALUES (?, ?)';

    for (const record of publisher) {
        await DB_Query.query(sqlBookPublisher, [resBook.insertId, record]);
    }

    for (const record of author) {
        await DB_Query.query(sqlBookAuthor, [resBook.insertId, record]);
    }

    for (const record of category) {
        await DB_Query.query(sqlBookCategory, [resBook.insertId, record]);
    }

    const bookVariantIds = [];
    for(const record of variant){
        const varRes = await DB_Query.query(sqlBookVariant, [resBook.insertId, record.fk_variant_id, record.price])
        bookVariantIds.push({
            book_variant_id: varRes.insertId,
            fk_variant_id: record.fk_variant_id
        })
    }

    for (const img of image) {
        const { fk_variant_id, image_path, alt_text } = img;
        const matchingVariant = bookVariantIds.find(v => v.fk_variant_id == fk_variant_id);
        if (!matchingVariant) continue;

        const imageRes = await DB_Query.query(sqlBookImage, [image_path, alt_text]);
        await DB_Query.query(sqlBookImageVariant, [
            matchingVariant.book_variant_id,
            imageRes.insertId
        ]);
    } 
    return { message: 'Record has been successfully created.' };
};

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