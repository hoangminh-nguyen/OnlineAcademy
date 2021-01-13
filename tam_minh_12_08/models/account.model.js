const db = require("../utils/db");

module.exports = {
  async createAccountBytype(email, type) {
    const sql = `insert into account values ('${email}', null, ${type}, 2)`;
    const [rows, fields] = await db.load(sql);
  },

  async singleBytype(email, type) {
    const sql = `select * from account where email = '${email}' and type = ${type}`;
    const [rows, fields] = await db.load(sql);
    if (rows.length === 0) return null;
    return rows[0];
  },

  async single(email) {
    const sql = `select * from account where email = '${email}'`;
    const [rows, fields] = await db.load(sql);
    if (rows.length === 0) return null;
    return rows[0];
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
