const { patch } = require('../utils/db');
const db = require('../utils/db');
const { paginate } = require('./../config/default.json');
const { bestseller } = require('./../config/default.json');

module.exports = {
  async all() {
    const sql = `select if(DATEDIFF(curdate(), co.publish_day) < 14, 1, null) as newest, co.disablez, co.course_id, co.name, co.link_ava_course, co.discount, co.view_number, co.price, ra.numberStu, ra.rateStu, ra.rating, cs.spec_name, ct.type_name, te.fname, te.lname,  DATEDIFF(curdate(), co.publish_day) as day_ago from course co left  join (select course_id, avg(rating) as rating, count(student_id) as numberStu, count(if(rating > 0, 1, null)) as rateStu from stu_registerlist group by course_id) ra on co.course_id = ra.course_id join course_spec cs on co.spec = cs.spec_id join teacher te on co.teacher_id = te.teacher_id join course_type ct on co.type=ct.type_id`;
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async pageAll(offset) {
    const sql = `select if(DATEDIFF(curdate(), co.publish_day) < 14, 1, null) as newest, co.course_id, co.name, co.link_ava_course, co.discount, co.view_number, co.price, ra.numberStu, ra.rateStu, ra.rating, cs.spec_name, ct.type_name, te.fname, te.lname,  DATEDIFF(curdate(), co.publish_day) as day_ago from course co left  join (select course_id, avg(rating) as rating, count(student_id) as numberStu, count(if(rating > 0, 1, null)) as rateStu from stu_registerlist group by course_id) ra on co.course_id = ra.course_id join course_spec cs on co.spec = cs.spec_id join teacher te on co.teacher_id = te.teacher_id join course_type ct on co.type=ct.type_id where co.disablez = 0 limit ${paginate.limit} offset ${offset};`;
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async countAll() {
    const sql = `select count(*) as total from course co where co.disablez = 0`;
    const [rows, fields] = await db.load(sql);
    return rows[0].total;
  },

  async allChapterbyID(course_id) {
    const sql = `select * from course_chapter cc where cc.course_id = ${course_id}`;
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async allBySpec(spec_id) {
    const sql = `select * from course co where co.disablez = 0 and co.spec=${spec_id}`;
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async pageByTypeName(type_name, offset) {
    const sql = `select if(DATEDIFF(curdate(), co.publish_day) < 14, 1, null) as newest, (co.price - co.price*co.discount/100) as newprice, co.course_id, co.name, co.link_ava_course, co.discount, co.view_number, co.price, ra.numberStu, ra.rateStu, ra.rating, cs.spec_name, ct.type_name, te.fname, te.lname,  DATEDIFF(curdate(), co.publish_day) as day_ago from course co left  join (select course_id, avg(rating) as rating, count(student_id) as numberStu, count(if(rating > 0, 1, null)) as rateStu from stu_registerlist group by course_id) ra on co.course_id = ra.course_id join course_spec cs on co.spec = cs.spec_id join teacher te on co.teacher_id = te.teacher_id join course_type ct on co.type=ct.type_id  where co.disablez = 0 and ct.type_name = '${type_name}' limit ${paginate.limit} offset ${offset}`;
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async pageByTypeNameSortRating(type_name, offset) {
    const sql = `select if(DATEDIFF(curdate(), co.publish_day) < 14, 1, null) as newest, (co.price - co.price*co.discount/100) as newprice, co.course_id, co.name, co.link_ava_course, co.discount, co.view_number, co.price, ra.numberStu, ra.rateStu, ra.rating, cs.spec_name, ct.type_name, te.fname, te.lname,  DATEDIFF(curdate(), co.publish_day) as day_ago from course co left  join (select course_id, avg(rating) as rating, count(student_id) as numberStu, count(if(rating > 0, 1, null)) as rateStu from stu_registerlist group by course_id) ra on co.course_id = ra.course_id join course_spec cs on co.spec = cs.spec_id join teacher te on co.teacher_id = te.teacher_id join course_type ct on co.type=ct.type_id  where co.disablez = 0 and ct.type_name = '${type_name}' order by ra.rating desc limit ${paginate.limit} offset ${offset}`;
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async pageByTypeNameSortPrice(type_name, offset) {
    const sql = `select if(DATEDIFF(curdate(), co.publish_day) < 14, 1, null) as newest,  (co.price - co.price*co.discount/100) as newprice, co.course_id, co.name, co.link_ava_course, co.discount, co.view_number, co.price, ra.numberStu, ra.rateStu, ra.rating, cs.spec_name, ct.type_name, te.fname, te.lname,  DATEDIFF(curdate(), co.publish_day) as day_ago from course co left  join (select course_id, avg(rating) as rating, count(student_id) as numberStu, count(if(rating > 0, 1, null)) as rateStu from stu_registerlist group by course_id) ra on co.course_id = ra.course_id join course_spec cs on co.spec = cs.spec_id join teacher te on co.teacher_id = te.teacher_id join course_type ct on co.type=ct.type_id  where co.disablez = 0 and ct.type_name = '${type_name}' order by newprice asc limit ${paginate.limit} offset ${offset}`;
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async countByTypeName(type_name) {
    const sql = `select count(*) as total from course co join course_type ct on co.type=ct.type_id where co.disablez = 0 and ct.type_name = '${type_name}'`;
    const [rows, fields] = await db.load(sql);
    return rows[0].total;
  },

  async pageBySpecName(spec_name, offset) {
    const sql = `select if(DATEDIFF(curdate(), co.publish_day) < 14, 1, null) as newest, (co.price - co.price*co.discount/100) as newprice, co.course_id, co.name, co.link_ava_course, co.discount, co.view_number, co.price, ra.numberStu, ra.rateStu, ra.rating, cs.spec_name, ct.type_name, te.fname, te.lname,  DATEDIFF(curdate(), co.publish_day) as day_ago from course co left  join (select course_id, avg(rating) as rating, count(student_id) as numberStu, count(if(rating > 0, 1, null)) as rateStu from stu_registerlist group by course_id) ra on co.course_id = ra.course_id join course_spec cs on co.spec = cs.spec_id join teacher te on co.teacher_id = te.teacher_id join course_type ct on co.type=ct.type_id where co.disablez = 0 and cs.spec_name= '${spec_name}' limit ${paginate.limit} offset ${offset}`;
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async pageBySpecNameSortRating(spec_name, offset) {
    const sql = `select if(DATEDIFF(curdate(), co.publish_day) < 14, 1, null) as newest, (co.price - co.price*co.discount/100) as newprice, co.course_id, co.name, co.link_ava_course, co.discount, co.view_number, co.price, ra.numberStu, ra.rateStu, ra.rating, cs.spec_name, ct.type_name, te.fname, te.lname,  DATEDIFF(curdate(), co.publish_day) as day_ago from course co left  join (select course_id, avg(rating) as rating, count(student_id) as numberStu, count(if(rating > 0, 1, null)) as rateStu from stu_registerlist group by course_id) ra on co.course_id = ra.course_id join course_spec cs on co.spec = cs.spec_id join teacher te on co.teacher_id = te.teacher_id join course_type ct on co.type=ct.type_id where co.disablez = 0 and cs.spec_name= '${spec_name}' order by ra.rating desc limit ${paginate.limit} offset ${offset}`;
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async pageBySpecNameSortPrice(spec_name, offset) {
    const sql = `select if(DATEDIFF(curdate(), co.publish_day) < 14, 1, null) as newest, (co.price - co.price*co.discount/100) as newprice, co.course_id, co.name, co.link_ava_course, co.discount, co.view_number, co.price, ra.numberStu, ra.rateStu, ra.rating, cs.spec_name, ct.type_name, te.fname, te.lname,  DATEDIFF(curdate(), co.publish_day) as day_ago from course co left  join (select course_id, avg(rating) as rating, count(student_id) as numberStu, count(if(rating > 0, 1, null)) as rateStu from stu_registerlist group by course_id) ra on co.course_id = ra.course_id join course_spec cs on co.spec = cs.spec_id join teacher te on co.teacher_id = te.teacher_id join course_type ct on co.type=ct.type_id where co.disablez = 0 and cs.spec_name= '${spec_name}' order by newprice asc limit ${paginate.limit} offset ${offset}`;
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async countBySpecName(spec_name) {
    const sql = `select if(DATEDIFF(curdate(), co.publish_day) < 14, 1, null) as newest, count(*) as total from course co join course_spec cs on (co.type=cs.type_id and co.spec=cs.spec_id) where co.disablez = 0 and cs.spec_name= '${spec_name}'`;
    const [rows, fields] = await db.load(sql);
    return rows[0].total;
  },

  async single(course_id) {
    const sql = `select * from course co left join (select course_id, avg(rating) as rating, count(student_id) as numberStu, count(if(rating > 0, 1, null)) as rateStu from stu_registerlist group by course_id) ra on co.course_id = ra.course_id join course_spec cs on co.spec = cs.spec_id  join teacher te on co.teacher_id = te.teacher_id join course_type ct on co.type=ct.type_id join course_detail cd on co.course_id = cd.course_id where co.course_id = ${course_id};`;
    const [rows, fields] = await db.load(sql);
    if (rows.length === 0)
      return null;

    return rows[0];
  },

  async updateViewNumber(course_id){
    const sql = `update course set view_number= view_number + 1 where course_id=${course_id}`;
    const [rows, fields] = await db.load(sql);
  },

  async topTenNewest() {
    const sql = 'select if(DATEDIFF(curdate(), co.publish_day) < 14, 1, null) as newest, co.course_id, co.name, co.link_ava_course, co.discount, co.view_number, co.price, ra.numberStu, ra.rateStu, ra.rating, cs.spec_name, ct.type_name, te.fname, te.lname,  DATEDIFF(curdate(), co.publish_day) as day_ago from course co left  join (select course_id, avg(rating) as rating, count(student_id) as numberStu, count(if(rating > 0, 1, null)) as rateStu from stu_registerlist group by course_id) ra on co.course_id = ra.course_id join course_spec cs on co.spec = cs.spec_id join teacher te on co.teacher_id = te.teacher_id join course_type ct on co.type=ct.type_id where co.disablez = 0 order by publish_day desc limit 10;';
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async load_chapter(course_id) {
    const sql = `select cc.chap_num, cc.chap_name, cc.link_vid from course co join course_chapter cc on (co.course_id = cc.course_id) where co.course_id= ${course_id}`;
    const [rows, fields] = await db.load(sql);
    return rows;
  },
  async topBestseller() {
    const sql = `select co.course_id from course co left  join (select course_id, avg(rating) as rating, count(student_id) as numberStu, count(if(rating > 0, 1, null)) as rateStu from stu_registerlist group by course_id) ra on co.course_id = ra.course_id join course_spec cs on co.spec = cs.spec_id join teacher te on co.teacher_id = te.teacher_id join course_type ct on co.type=ct.type_id where co.disablez = 0 order by ra.numberStu desc limit ${bestseller.limit}`;
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async topTenViewed() {
    const sql = 'select if(DATEDIFF(curdate(), co.publish_day) < 14, 1, null) as newest, co.course_id, co.name, co.link_ava_course, co.discount, co.view_number, co.price, ra.numberStu, ra.rateStu, ra.rating, cs.spec_name, ct.type_name, te.fname, te.lname, DATEDIFF(curdate(), co.publish_day) as day_ago from course co left  join (select course_id, avg(rating) as rating, count(student_id) as numberStu, count(if(rating > 0, 1, null)) as rateStu from stu_registerlist group by course_id) ra on co.course_id = ra.course_id join course_spec cs on co.spec = cs.spec_id join teacher te on co.teacher_id = te.teacher_id join course_type ct on co.type=ct.type_id where co.disablez = 0  order by view_number desc limit 10;';
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async topFiveRating() {
    const sql = 'select if(DATEDIFF(curdate(), co.publish_day) < 14, 1, null) as newest, co.course_id, co.name, co.link_ava_course, co.discount, co.view_number, co.price, ra.numberStu, ra.rateStu, ra.rating, cs.spec_name, ct.type_name, te.fname, te.lname, DATEDIFF(curdate(), co.publish_day) as day_ago from course co left join (select course_id, avg(rating) as rating, count(student_id) as numberStu, count(if(rating > 0, 1, null)) as rateStu from stu_registerlist group by course_id) ra on co.course_id = ra.course_id join course_spec cs on co.spec = cs.spec_id join teacher te on co.teacher_id = te.teacher_id join course_type ct on co.type=ct.type_id where co.disablez = 0  order by rating desc limit 5;';
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async topFiveRegisterInSpec(spec_id) {
    const sql = `select if(DATEDIFF(curdate(), co.publish_day) < 14, 1, null) as newest, co.course_id, co.name, co.link_ava_course, co.discount, co.view_number, co.price, ra.numberStu, ra.rateStu, ra.rating, cs.spec_name, ct.type_name, te.fname, te.lname, DATEDIFF(curdate(), co.publish_day) as day_ago from course co left join (select course_id, avg(rating) as rating, count(student_id) as numberStu, count(if(rating > 0, 1, null)) as rateStu from stu_registerlist group by course_id) ra on co.course_id = ra.course_id join course_spec cs on co.spec = cs.spec_id join teacher te on co.teacher_id = te.teacher_id join course_type ct on co.type=ct.type_id where co.disablez = 0 and spec =${spec_id} order by numberStu desc limit 5;`;
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async allReviewByID(course_id) {
    const sql = `select * from stu_registerlist re join student st on re.student_id = st.student_id where course_id = ${course_id}`;
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async allCourseIDByTeacherID(teacher_id) {
    const sql = `select co.course_id from course co where co.teacher_id = ${teacher_id}`;
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async disableCoursebyID(course_id) {
    const sql = `update course set disablez = 1 where course_id=${course_id}`;
    const [rows, fields] = await db.load(sql);
  },

  async enableCoursebyID(course_id) {
    const sql = `update course set disablez = 0 where course_id=${course_id}`;
    const [rows, fields] = await db.load(sql);
  },

  async delCourseByCourseID(course_id) {
    const condition = {
      course_id: course_id
    };

    await db.del(condition, 'stu_registerlist');
    await db.del(condition, 'stu_watchlist');
    await db.del(condition, 'course_chapter');
    await db.del(condition, 'course_detail');

    const [result, fields] = await db.del(condition, 'course');

    return result;
  },

  async allByStudentIDWatchlist(student_id) {
    const sql = `select if(DATEDIFF(curdate(), co.publish_day) < 14, 1, null) as newest, co.course_id, co.name, co.link_ava_course, co.discount, co.view_number, co.price, ra.numberStu, ra.rateStu, ra.rating, cs.spec_name, ct.type_name, te.fname, te.lname, DATEDIFF(curdate(), co.publish_day) as day_ago from course co left join (select course_id, avg(rating) as rating, count(student_id) as numberStu, count(if(rating > 0, 1, null)) as rateStu from stu_registerlist group by course_id) ra on co.course_id = ra.course_id join course_spec cs on co.spec = cs.spec_id join teacher te on co.teacher_id = te.teacher_id join course_type ct on co.type=ct.type_id join stu_watchlist stwa on stwa.course_id=co.course_id WHERE co.disablez = 0 and stwa.student_id='${student_id}'`;
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async idByCourseName(name) {
    const sql = `select co.course_id from course co WHERE co.name like '${name}'`;
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async allByStudentIDRegister(student_id) {
    const sql = `select if(DATEDIFF(curdate(), co.publish_day) < 14, 1, null) as newest, cd.state, stre.chap_num, co.disablez, stre.rating as sturate, co.course_id, co.name, co.link_ava_course, co.discount, co.view_number, co.price, ra.numberStu, ra.rateStu, ra.rating, cs.spec_name, ct.type_name, te.fname, te.lname,  DATEDIFF(curdate(), co.publish_day) as day_ago, stre.register_date  as register from course co left join (select course_id, avg(rating) as rating, count(student_id) as numberStu, count(if(rating > 0, 1, null)) as rateStu from stu_registerlist group by course_id) ra on co.course_id = ra.course_id join course_spec cs on co.spec = cs.spec_id join teacher te on co.teacher_id = te.teacher_id join course_type ct on co.type=ct.type_id join stu_registerlist stre on stre.course_id=co.course_id join course_detail cd on (co.course_id = cd.course_id) WHERE stre.student_id='${student_id}' order by stre.register_date DESC;`;
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async allByTeacherId(teacher_id){
    const sql = `select if(DATEDIFF(curdate(), co.publish_day) < 14, 1, null) as newest, co.disablez, cd.last_modify as register,  co.course_id, co.name, co.link_ava_course, co.discount, co.view_number, co.price, ra.numberStu, ra.rateStu, ra.rating, cs.spec_name, ct.type_name, te.fname, te.lname,  DATEDIFF(curdate(), co.publish_day) as day_ago from course co left join (select course_id, avg(rating) as rating, count(student_id) as numberStu, count(if(rating > 0, 1, null)) as rateStu from stu_registerlist group by course_id) ra on co.course_id = ra.course_id join course_spec cs on co.spec = cs.spec_id join teacher te on co.teacher_id = te.teacher_id join course_type ct on co.type=ct.type_id join course_detail cd on co.course_id = cd.course_id WHERE co.teacher_id =${teacher_id};`;
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async countSearchResult(search) {
    const sql = `select count(distinct co.course_id) as total from course co join course_spec cs on co.spec = cs.spec_id join teacher te on co.teacher_id = te.teacher_id join course_type ct on co.type=ct.type_id join course_chapter cc on co.course_id = cc.course_id join course_detail cd on co.course_id = cd.course_id where co.disablez = 0 and ( match(co.name) against('${search}') or match(cc.chap_name) against('${search}') or match(cd.short_info, cd.full_info) against('${search}') or match(cs.spec_name) against('${search}') or match(ct.type_name) against('${search}') or match(te.fname, te.fname) against('${search}'))`;
    const [rows, fields] = await db.load(sql);
    return rows[0].total;
  },

  async pageSearchResultSortRelevance(search, offset) {
    const sql = `select distinct co.course_id, co.disablez, co.name, if(DATEDIFF(curdate(), co.publish_day) < 14, 1, null) as newest,  (co.price - co.price*co.discount/100) as newprice, co.link_ava_course, co.discount, co.view_number, co.price, ra.numberStu, ra.rateStu, ra.rating, cs.spec_name, ct.type_name, te.fname, te.lname,  DATEDIFF(curdate(), co.publish_day) as day_ago from course co left  join (select course_id, avg(rating) as rating, count(student_id) as numberStu, count(if(rating > 0, 1, null)) as rateStu from stu_registerlist group by course_id) ra on co.course_id = ra.course_id join course_spec cs on co.spec = cs.spec_id join teacher te on co.teacher_id = te.teacher_id join course_type ct on co.type=ct.type_id join course_chapter cc on co.course_id = cc.course_id join course_detail cd on co.course_id = cd.course_id where (match(co.name) against('${search}') or match(cc.chap_name) against('${search}') or match(cd.short_info, cd.full_info) against('${search}') or match(cs.spec_name) against('${search}') or match(ct.type_name) against('${search}') or match(te.fname, te.fname) against('${search}')) and co.disablez = 0 order by (match(co.name) against('${search}') + match(cc.chap_name) against('${search}') + match(cd.short_info, cd.full_info) against('${search}') +  match(cs.spec_name) against('${search}') + match(ct.type_name) against('${search}') + match(te.fname, te.fname) against('${search}')) DESC limit ${paginate.limit} offset ${offset};`;
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async checkStuCo(student_id, course_id){
    const sql = `select st.course_id from stu_registerlist st  where st.course_id = ${course_id} and st.student_id = ${student_id};`;
    const [rows, fields] = await db.load(sql);
    if (rows.length === 0)
      return null;

    return rows[0];
  },

  async checkTeCo(teacher_id, course_id){
    const sql = `select co.course_id from course co  where co.course_id = ${course_id} and co.teacher_id = ${teacher_id};`;
    const [rows, fields] = await db.load(sql);
    if (rows.length === 0)
      return null;

    return rows[0];
  },

  async get_video(course_id,chap_num){
    const sql = `select cc.link_vid,cc.preview, cc.chap_des, concat(te.fname," " ,te.lname) as full_name, cc.chap_name, te.link_ava_teacher,te.info, te.email from course_chapter cc join course co on (co.course_id = cc.course_id) join teacher te on (te.teacher_id = co.teacher_id) where cc.course_id = ${course_id} and cc.chap_num = ${chap_num}`;
    const [rows, fields] = await db.load(sql);
    if (rows.length === 0)
      return null;

    return rows[0];
  },

  async pageSearchResultSortRating(search, offset) {
    const sql = `select distinct co.course_id, co.name, if(DATEDIFF(curdate(), co.publish_day) < 14, 1, null) as newest,  (co.price - co.price*co.discount/100) as newprice,  co.link_ava_course, co.discount, co.view_number, co.price, ra.numberStu, ra.rateStu, ra.rating, cs.spec_name, ct.type_name, te.fname, te.lname,  DATEDIFF(curdate(), co.publish_day) as day_ago from course co left  join (select course_id, avg(rating) as rating, count(student_id) as numberStu, count(if(rating > 0, 1, null)) as rateStu from stu_registerlist group by course_id) ra on co.course_id = ra.course_id join course_spec cs on co.spec = cs.spec_id join teacher te on co.teacher_id = te.teacher_id join course_type ct on co.type=ct.type_id join course_chapter cc on co.course_id = cc.course_id join course_detail cd on co.course_id = cd.course_id where (match(co.name) against('${search}') or match(cc.chap_name) against('${search}') or match(cd.short_info, cd.full_info) against('${search}') or match(cs.spec_name) against('${search}') or match(ct.type_name) against('${search}') or match(te.fname, te.fname) against('${search}')) and co.disablez = 0 order by ra.rating desc limit ${paginate.limit} offset ${offset};`;
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async pageSearchResultSortPrice(search, offset) {
    const sql = `select distinct co.course_id, co.name, if(DATEDIFF(curdate(), co.publish_day) < 14, 1, null) as newest,  (co.price - co.price*co.discount/100) as newprice,  co.link_ava_course, co.discount, co.view_number, co.price, ra.numberStu, ra.rateStu, ra.rating, cs.spec_name, ct.type_name, te.fname, te.lname,  DATEDIFF(curdate(), co.publish_day) as day_ago from course co left  join (select course_id, avg(rating) as rating, count(student_id) as numberStu, count(if(rating > 0, 1, null)) as rateStu from stu_registerlist group by course_id) ra on co.course_id = ra.course_id join course_spec cs on co.spec = cs.spec_id join teacher te on co.teacher_id = te.teacher_id join course_type ct on co.type=ct.type_id join course_chapter cc on co.course_id = cc.course_id join course_detail cd on co.course_id = cd.course_id where (match(co.name) against('${search}') or match(cc.chap_name) against('${search}') or match(cd.short_info, cd.full_info) against('${search}') or match(cs.spec_name) against('${search}') or match(ct.type_name) against('${search}') or match(te.fname, te.fname) against('${search}')) and co.disablez = 0 order by newprice asc limit ${paginate.limit} offset ${offset};`;
    const [rows, fields] = await db.load(sql);
    return rows;
  },

  async load_info(course_id) {
    const sql = `select co.name, cd.short_info, cd.full_info, co.price, ct.type_id, cp.spec_id, ct.type_name, cp.spec_name from course co join course_detail cd on (co.course_id = cd.course_id) join course_type ct on (co.type = ct.type_id) join course_spec cp on (co.spec = cp.spec_id) where co.course_id = ${course_id};`;
    const [rows, fields] = await db.load(sql);
    return rows[0];
  },

  async load_chapter_info(course_id, chap_num){
    const sql = `select * from course_chapter where course_id = ${course_id} and chap_num = ${chap_num};`;
    const [rows, fields] = await db.load(sql);
    return rows[0];
  },

  async delete_chap(course_id, chap_num){
    const sql = `delete from course_chapter where course_id = ${course_id} and chap_num = ${chap_num}`;
    const [rows, fields] = await db.load(sql);
    return rows[0];
  },

  async add(course) {
    const [result, fields] = await db.add(course, "course");
    return result;
  },



  async patch(course) {
    const [result, fields] = await db.patch(course, "course");
    return result;
  }
};
