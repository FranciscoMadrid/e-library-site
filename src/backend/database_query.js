import database from '../server/database.js'
class DB_Query {
    static async query(sql, params = []) {
        try {
                const [result] = await database.query(sql, params);
                return result;
            } catch (error) {
                console.error('Database query error:', error);
                throw error;
            }
    }
}
export default DB_Query;