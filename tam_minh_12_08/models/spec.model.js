const db = require('../utils/db');

module.exports = {
  async all() {
    const sql = 'select cs.spec_id, cs.spec_name, ct.type_name, ct.type_id from course_spec cs join course_type ct on cs.type_id=ct.type_id';
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  // async allWithDetails() {
  //   const sql = `
  //     select c.*, count(p.ProID) as ProductCount, 0 as IsActive
  //     from categories c left join products p on c.CatID = p.CatID
  //     group by c.CatID, c.CatName
  //   `;
  //   const [rows, fields] = await db.load(sql);
  //   return rows;
  // },

  async single(id) {
    const sql = `select cs.spec_id, ct.type_id cs.spec_name, ct.type_name from course_spec cs join course_type ct on cs.type_id=ct.type_id where cs.spec_id = ${id}`;
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
  async getSpecbyType(typeid) {
    const sql = `select cs.spec_id, cs.spec_name from course_spec cs where cs.type_id = ${typeid}`;
    const [rows, fields] = await db.load(sql);
    if (rows.length === 0)
      return null;
    return rows;
  },




  async add(category) {
    const [result, fields] = await db.add(category, 'course_spec');
    // console.log(result);
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
      spec_id: entity.CatID
    };
    delete(entity.CatID);

    const [result, fields] = await db.patch(entity, condition, 'course_spec');
    return result;
  }
};
