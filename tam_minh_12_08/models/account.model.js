const { add } = require('../utils/db');
const db = require('../utils/db');

module.exports = {
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
  async addStudent(student) {
    const [result, fields] = await db.add(student, 'student');
    return result;
  },
};
