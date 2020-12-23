const db = require('../utils/db');

module.exports = {
  async all() {
    const sql = 'select cs.spec_id, cs.spec_name, ct.type_name, ct.type_id from course_spec cs join course_type ct on cs.type_id=ct.type_id';
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async single(id) {
    const sql = `select cs.spec_id, ct.type_id, cs.spec_name, ct.type_name, cs.icon from course_spec cs join course_type ct on cs.type_id=ct.type_id where cs.spec_id = ${id}`;
    const [rows, fields] = await db.load(sql);
    if (rows.length === 0)
      return null;
    return rows[0];
  },

  async getType(id) {
    const sql = `select ct.type_id, ct.type_name from course_type ct`;
    const [rows, fields] = await db.load(sql);
    if (rows.length === 0)
      return null;
    return rows;
  },

  async test() {
    const sql = 'select * from course_spec';
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async getSpecbyType(typeid) {
    const sql = `select cs.spec_id, cs.spec_name, cs.icon from course_spec cs where cs.type_id = ${typeid}`;
    const [rows, fields] = await db.load(sql);
    if (rows.length === 0)
      return null;
    return rows;
  },

  async getSpecMostStuReLast7Days() {
    const sql = `select * from course_spec cs join (select co.spec, count(st.student_id) as numberStu from stu_registerlist st join course co on st.course_id = co.course_id  where st.register_date between (CURDATE() - INTERVAL 7 DAY ) and CURDATE() group by co.spec) re on cs.spec_id = re.spec join course_type ct on ct.type_id = cs.type_id limit 5`;
    const [rows, fields] = await db.load(sql);
    if (rows.length === 0)
      return null;
    return rows;
  },


  async add(spec) {
    const [result, fields] = await db.add(spec, 'course_spec');
    return result;
  },

  async del(id) {
    const condition = {
      spec_id: id
    };
    const [result, fields] = await db.del(condition, 'course_spec');
    return result;
  },

  async patch(entity) {
    const condition = {
      spec_id: entity.spec_id
    };
    delete(entity.spec_id);

    const [result, fields] = await db.patch(entity, condition, 'course_spec');
    return result;
  }
};
