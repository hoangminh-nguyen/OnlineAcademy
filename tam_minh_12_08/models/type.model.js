const db = require('../utils/db');

module.exports = {
    async single(id) {
        const sql = `select * from course_type where type_id = ${id}`;
        const [rows, fields] = await db.load(sql);
        if (rows.length === 0)
            return null;
        return rows[0];
    },
}
