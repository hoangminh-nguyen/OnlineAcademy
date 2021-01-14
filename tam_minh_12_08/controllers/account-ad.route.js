const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const accountModel = require("../models/account.model");
const courseModel = require("../models/course.model");
const studentModel = require("../models/student.model");
const teacherModel = require("../models/teacher.model");
const discount = require('../utils/discount');

router.get("/", async function(req, res, next) {
  const teacher = await teacherModel.allTeacher();
  const student = await studentModel.allStudent();

  res.render("vwAccount-ad/index", {
    teacher,
    student,
  });
});

router.get("/edit", async function(req, res) {
  const email = req.query.email;
  const acc = await accountModel.single(email);
  const mode = acc["mode"];

  var info;
  if (mode === 2) {
    info = await studentModel.studentInfo(email);
  } else {
    info = await teacherModel.teacherInfo(email);
  }

  if (info === null) {
    return res.redirect("/admin/accounts");
  }

  res.render("vwAccount-ad/edit", {
    info,
    isStudent: mode === 2,
  });
});

router.post("/patch", async function(req, res) {
  const mode = parseInt(req.query.mode);

  if (mode === 1) {
    await teacherModel.patch(req.body);
  } else {
    await studentModel.patch(req.body);
  }

  res.redirect("/admin/accounts");
});

router.post("/del", async function(req, res) {
  const mode = parseInt(req.query.mode);

  console.log(mode);

  if (mode === 1) {
    const id_courses = await courseModel.allCourseIDByTeacherID(
      req.body.teacher_id
    );

    console.log(id_courses);

    for (let i = 0; i < id_courses.length; i++) {
      await courseModel.delCourseByCourseID(id_courses[i]["course_id"]);
    }

    await teacherModel.del(req.body.teacher_id);
  } else {
    await studentModel.del(req.body.student_id);
  }

  await accountModel.del(req.body.email);

  res.redirect("/admin/accounts");
});

router.get("/password", async function(req, res) {
  const email = req.query.email;
  const account = await accountModel.single(email);

  res.render("vwAccount-ad/password", {
    account,
  });
});

router.post("/change", async function(req, res) {
  var account = req.body;
  account["password"] = bcrypt.hashSync(req.body.password, 10);

  await accountModel.patch(account);

  res.redirect("/admin/accounts");
});

router.get('/viewcourse/:teacher_id',async function(req, res){
  const teacher_id = req.params.teacher_id;
  var course = await courseModel.allByTeacherId(teacher_id);
  course = discount.calcCourses(course);
  res.render('vwTeacher/view_course', {
      course,
      numberCourse: course.length,
  });
})

router.get("/addteacher", async function(req, res) {
  res.render("vwAccount-ad/addteacher", {});
});

router.get('/is-available', async function (req, res) {
  const email = req.query.email;
  const user = await accountModel.single(email);
  if (user === null) {
    return res.json(true);
  }

  res.json(false);
})

router.post("/addteacher", async function(req, res) {
  const hash = bcrypt.hashSync(req.body.password, 10);
  const user = {
    password: hash,
    email: req.body.email,
    mode: 1, // teacher
  };
  const teacher = {
    teacher_id: null,
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    link_ava_teacher:
      "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png",
  };
  await accountModel.add(user);
  await teacherModel.add(teacher);
  res.redirect("/admin/accounts");
});

module.exports = router;
