const db = require('../utils/db');

module.exports = {

    async patch(entity) {
        const condition = {
            teacher_id: entity.teacher_id
        };
        delete(entity.teacher_id);

        const [result, fields] = await db.patch(entity, condition, 'teacher');
        return result;
    },

    async del(id) {
        const condition = {
            teacher_id: id
        };
        const [result, fields] = await db.del(condition, 'teacher');
        return result;
    },
}
