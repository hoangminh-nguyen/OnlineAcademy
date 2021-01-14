const db = require("../utils/db");

module.exports = {
  async createAccountBytype(email) {
    const sql = `insert into account values ('${email}', null, 1, 2)`;
    const [rows, fields] = await db.load(sql);
  },

  async activate(email) {
    const sql = `update account set activate = 1 where email = '${email}'`;
    const [rows, fields] = await db.load(sql);
  },

  async single(email) {
    const sql = `select * from account where email = '${email}'`;
    const [rows, fields] = await db.load(sql);
    if (rows.length === 0) return null;
    return rows[0];
  },

  async checkAvailableEmail(email) {
    const sql = `select * from account where email = '${email}'`;
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async findOrCreate(email){
    if (this.single(email) === null){
      const sql = `select * from account where email = '${email}'`;
      const [rows, fields] = await db.load(sql);
    }
  },

  async add(user) {
    const [result, fields] = await db.add(user, "account");
    return result;
  },

  async del(email) {
    const condition = {
      email: email,
    };

    const [result, fields] = await db.del(condition, "account");
    return result;
  },

  async patch(entity) {
    const condition = {
      email: entity.email,
    };
    delete entity.email;

    const [result, fields] = await db.patch(entity, condition, "account");
    return result;
  },

};
