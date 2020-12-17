const db = require('../utils/db');

module.exports = {
  async all() {
    const sql = 'select co.course_id, co.name, co.link_ava_course, co.discount, co.view_number, co.price, ra.numberStu, ra.rating, cs.spec_name, ct.type_name, te.fname, te.lname,  DATEDIFF(curdate(), co.publish_day) as day_ago from course co left  join (select course_id, avg(rating) as rating, count(student_id) as numberStu, count(if(rating > 0, 1, null)) as rateStu from stu_registerlist group by course_id) ra on co.course_id = ra.course_id join course_spec cs on co.spec = cs.spec_id join teacher te on co.teacher_id = te.teacher_id join course_type ct on co.type=ct.type_id ;';
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async allChapterbyID(course_id) {
    const sql = `select * from course_chapter cc where cc.course_id = ${course_id}`;
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async allBySpec(spec_id) {
    const sql = `select * from course where spec=${spec_id}`;
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async allByTypeName(type__name) {
    const sql = `select * from course co join course_type ct on co.type=ct.type_id where ct.type_name = '${type__name}'`;
    const [rows, fields] = await db.load(sql);
    return rows;
  },
  async allBySpecName(spec__name) {
    const sql = `select * from course co join course_spec cs on (co.type=cs.type_id and co.spec=cs.spec_id) where cs.spec_name= '${spec__name}'`;
    const [rows, fields] = await db.load(sql);
    return rows;
  },


  async single(course_id) {
    const sql = `select * from course co left join (select course_id, avg(rating) as rating, count(student_id) as numberStu, count(if(rating > 0, 1, null)) as rateStu from stu_registerlist group by course_id) ra on co.course_id = ra.course_id join course_spec cs on co.spec = cs.spec_id  join teacher te on co.teacher_id = te.teacher_id join course_type ct on co.type=ct.type_id join course_detail cd on co.course_id = cd.course_id where co.course_id = ${course_id};`;
    const [rows, fields] = await db.load(sql);
    if (rows.length === 0)
      return null;

    return rows[0];
  },

  async topTenNewest() {
    const sql = 'select co.course_id, co.name, co.link_ava_course, co.discount, co.view_number, co.price, ra.numberStu, ra.rating, cs.spec_name, ct.type_name, te.fname, te.lname,  DATEDIFF(curdate(), co.publish_day) as day_ago from course co left  join (select course_id, avg(rating) as rating, count(student_id) as numberStu, count(if(rating > 0, 1, null)) as rateStu from stu_registerlist group by course_id) ra on co.course_id = ra.course_id join course_spec cs on co.spec = cs.spec_id join teacher te on co.teacher_id = te.teacher_id join course_type ct on co.type=ct.type_id order by publish_day desc limit 10;';
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async topTenViewed() {
    const sql = 'select co.course_id, co.name, co.link_ava_course, co.discount, co.view_number, co.price, ra.numberStu, ra.rating, cs.spec_name, ct.type_name, te.fname, te.lname, DATEDIFF(curdate(), co.publish_day) as day_ago from course co left  join (select course_id, avg(rating) as rating, count(student_id) as numberStu, count(if(rating > 0, 1, null)) as rateStu from stu_registerlist group by course_id) ra on co.course_id = ra.course_id join course_spec cs on co.spec = cs.spec_id join teacher te on co.teacher_id = te.teacher_id join course_type ct on co.type=ct.type_id order by view_number desc limit 10;';
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async topFiveRating() {
    const sql = 'select co.course_id, co.name, co.link_ava_course, co.discount, co.view_number, co.price, ra.numberStu, ra.rating, cs.spec_name, ct.type_name, te.fname, te.lname, DATEDIFF(curdate(), co.publish_day) as day_ago from course co left join (select course_id, avg(rating) as rating, count(student_id) as numberStu, count(if(rating > 0, 1, null)) as rateStu from stu_registerlist group by course_id) ra on co.course_id = ra.course_id join course_spec cs on co.spec = cs.spec_id join teacher te on co.teacher_id = te.teacher_id join course_type ct on co.type=ct.type_id order by rating desc limit 5;';
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async topFiveRegisterInSpec(spec_id) {
    const sql = `select co.course_id, co.name, co.link_ava_course, co.discount, co.view_number, co.price, ra.numberStu, ra.rating, cs.spec_name, ct.type_name, te.fname, te.lname, DATEDIFF(curdate(), co.publish_day) as day_ago from course co left join (select course_id, avg(rating) as rating, count(student_id) as numberStu, count(if(rating > 0, 1, null)) as rateStu from stu_registerlist group by course_id) ra on co.course_id = ra.course_id join course_spec cs on co.spec = cs.spec_id join teacher te on co.teacher_id = te.teacher_id join course_type ct on co.type=ct.type_id where spec =${spec_id} order by numberStu desc limit 5;`;
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async allReviewByID(course_id) {
    const sql = `select * from stu_registerlist re join student st on re.student_id = st.student_id where course_id = ${course_id}`;
    const [rows, fields] = await db.load(sql);
    return rows;
  },
};
