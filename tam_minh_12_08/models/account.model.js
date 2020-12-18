const { add } = require('../utils/db');
const db = require('../utils/db');

module.exports = {

  //ACCOUNT
  async single(email) {
    const sql = `select * from account where email = '${email}'`;
    const [rows, fields] = await db.load(sql);
    if (rows.length === 0)
      return null;
    return rows[0];
  },
  async add(user) {
    const [result, fields] = await db.add(user, 'account');
    return result;
  },

  //STUDENT
  async addStudent(student) {
    const [result, fields] = await db.add(student, 'student');
    return result;
  },
  
  async studentInfo(email) {
    const sql = `select * from account ac join student st on ac.email = st.email where ac.email = '${email}'`;
    const [rows, fields] = await db.load(sql);
    if (rows.length === 0)
      return null;
    return rows[0];
  },


  //TEACHER
  async teacherInfo(email) {
    const sql = `select * from account ac join teacher te on ac.email = te.email where ac.email = '${email}'`;
    const [rows, fields] = await db.load(sql);
    if (rows.length === 0)
      return null;
    return rows[0];
  },
};
