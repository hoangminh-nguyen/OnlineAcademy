const db = require('../utils/db');

module.exports = {
  async all() {
    const sql = 'select * from course';
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async allBySpec(spec_id) {
    const sql = `select * from course where spec=${spec_id}`;
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async single(course_id) {
    const sql = `select * from course where ProID=${course_id}`;
    const [rows, fields] = await db.load(sql);
    if (rows.length === 0)
      return null;

    return rows[0];
  },

  async topTenNewest() {
    const sql = 'select *, DATEDIFF(curdate(), co.publish_day) as day_ago from course co join (select course_id, avg(rating) as rating, count(student_id) as numberStu from stu_registerlist group by course_id) ra on co.course_id = ra.course_id join course_spec cs on co.spec = cs.spec_id join teacher te on co.teacher_id = te.teacher_id join course_type ct on co.type=ct.type_id order by publish_day desc limit 10;';
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async topTenViewed() {
    const sql = 'select *, DATEDIFF(curdate(), co.publish_day) as day_ago from course co join (select course_id, avg(rating) as rating, count(student_id) as numberStu from stu_registerlist group by course_id) ra on co.course_id = ra.course_id join course_spec cs on co.spec = cs.spec_id join teacher te on co.teacher_id = te.teacher_id join course_type ct on co.type=ct.type_id order by view_number desc limit 10;';
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async topFiveRating() {
    const sql = 'select *, DATEDIFF(curdate(), co.publish_day) as day_ago from course co join (select course_id, avg(rating) as rating, count(student_id) as numberStu from stu_registerlist group by course_id) ra on co.course_id = ra.course_id join course_spec cs on co.spec = cs.spec_id join teacher te on co.teacher_id = te.teacher_id join course_type ct on co.type=ct.type_id order by rating desc limit 5;';
    const [rows, fields] = await db.load(sql);
    return rows;
  },

};
