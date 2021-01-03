const db = require('../utils/db');

module.exports = {

    async patch(entity) {
        const condition = {
            student_id: entity.student_id
        };
        delete(entity.student_id);

        const [result, fields] = await db.patch(entity, condition, 'student');
        return result;
    },

    async del(id) {
        const condition = {
            student_id: id
        };

        await db.del(condition, 'stu_registerlist');
        await db.del(condition, 'stu_watchlist');

        const [result, fields] = await db.del(condition, 'student');
        return result;
    },
}
