const db = require("../utils/db");

module.exports = {
  async teacherInfo(email) {
    const sql = `select * from account ac join teacher te on ac.email = te.email where ac.email = '${email}'`;
    const [rows, fields] = await db.load(sql);
    if (rows.length === 0) return null;
    return rows[0];
  },

  async allTeacher() {
    const sql = `select * from teacher tc join account ac on tc.email = ac.email`;
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async patch(entity) {
    const condition = {
      teacher_id: entity.teacher_id,
    };
    delete entity.teacher_id;

    const [result, fields] = await db.patch(entity, condition, "teacher");
    return result;
  },

  async get_ava(teacher_id){
    const sql = `select link_ava_teacher as link_ava from teacher where teacher_id =${teacher_id}`;
    const [rows, fields] = await db.load(sql);
    return rows[0];
  },


  async del(id) {
    const condition = {
      teacher_id: id,
    };
    const [result, fields] = await db.del(condition, "teacher");
    return result;
  },

  async add(teacher) {
    const [result, fields] = await db.add(teacher, "teacher");
    return result;
  },
};
