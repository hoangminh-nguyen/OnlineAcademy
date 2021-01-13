const express = require("express");
const bcrypt = require("bcryptjs");
const userModel = require("../models/account.model");
const studentModel = require("../models/student.model");
const teacherModel = require('../models/teacher.model');
const auth = require("../middlewares/auth.mdw");
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
const router = express.Router();

// router.get('/profile', auth, function (req, res, next) {
//   res.render('vwAccount/profile');
// })

router.get("/signup", function(req, res, next) {
  if (req.user.auth === true) {
    return res.redirect("/");
  }
  res.render("vwAccount/signup", {
    layout: false,
  });
});

router.post("/signup", async function(req, res, next) {
  const hash = bcrypt.hashSync(req.body.password, 10);
  const user = {
    password: hash,
    email: req.body.emailaddress,
    mode: 2, //student
  };
  const student = {
    student_id: null,
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.emailaddress,
    link_ava_student:
      "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png",
  };
  await userModel.add(user);
  await studentModel.add(student);
  res.redirect("/account/login");
});

router.get("/is-available", async function(req, res) {
  const email = req.query.email;
  const user = await userModel.single(email);
  if (user === null) {
    return res.json(true);
  }

  res.json(false);
});

router.get("/login", function(req, res) {
  if (res.locals.auth === true) {
    return res.redirect("/");
  }
  res.render("vwAccount/login", {
    layout: false,
  });
});

router.post('/login',
  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/account/login'})
);

// router.post("/login", async function(req, res) {
//   const user = await userModel.single(req.body.email);
//   if (user === null) {
//     return res.render("vwAccount/login", {
//       layout: false,
//       err_message: "Email does not match any account.",
//     });
//   }

//   const ret = bcrypt.compareSync(req.body.password, user.password);
//   if (ret === false) {
//     return res.render("vwAccount/login", {
//       layout: false,
//       err_message: "Invalid password.",
//     });
//   }
//   //Lấy thông tin người dùng
//   var userInfo;
//   if (user.mode === 2) {
//     req.user.isStudent = true;
//     userInfo = await studentModel.studentInfo(user.email);
//   } else if (user.mode === 1) {
//     req.user.isTeacher = true;
//     userInfo = await teacherModel.teacherInfo(user.email);
//   } else if (user.mode === 0) {
//     req.user.isAdmin = true;
//     userInfo = user;
//   }
//   req.user.auth = true;
//   req.user.authUser = userInfo;

//   const url = req.user.retUrl || "/";
//   res.redirect(url);
// });

// router.post("/logout", async function(req, res) {
//   req.user.auth = false;
//   req.user.authUser = null;
//   req.user.retUrl = null;
//   req.user.isStudent = false;
//   req.user.isTeacher = false;
//   req.user.isAdmin = false;
//   const url = req.headers.referer || "/";
//   res.redirect(url);
// });

router.post('/logout', function(req, res){
  req.logout();
  const url = req.headers.referer || "/";
  res.redirect(url);
});

module.exports = router;
