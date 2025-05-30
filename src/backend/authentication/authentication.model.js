import DB_Query from "../database_query.js"

export const create = async({fk_user_id, session_token, ip_address, expires_at}) => {
    const sql = 'INSERT INTO user_session (fk_user_id, session_token, ip_address, expires_at) VALUES (?, ?, ?, ?)';
    const params = [fk_user_id, session_token, ip_address, expires_at];

    const result = await DB_Query.query(sql, params);

    return {message: 'User session created successfully'};
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

    const sql = `UPDATE user_session SET ${fields.join(', ')} WHERE user_session_id = ?`;
    values.push(id);

    const result = await DB_Query.query(sql, values);

    return result.affectedRows;
}
