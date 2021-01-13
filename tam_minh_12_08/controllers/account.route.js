const express = require("express");
const bcrypt = require("bcryptjs");
const userModel = require("../models/account.model");
const studentModel = require("../models/student.model");
const teacherModel = require('../models/teacher.model');
const auth = require("../middlewares/auth.mdw");
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const router = express.Router();

// router.get('/profile', auth, function (req, res, next) {
//   res.render('vwAccount/profile');
// })

router.get("/signup", function(req, res, next) {
  if (req.session.auth === true) {
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
  if (req.session.auth === true) {
    return res.redirect("/");
  }
  res.render("vwAccount/login", {
    layout: false,
  });
});


// PASSPORT

router.post('/login',
  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/account/login'})
);

router.get('/auth/google',
  passport.authenticate('google', { scope: ["profile", "email"] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/account/login' }),
  function(req, res) {
    res.redirect('/');
  });


router.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['email'] }));

router.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/account/login' }));



router.post('/logout', function(req, res){
  req.session.auth = false;
  req.user.authUser = null;
  req.user.retUrl = null;
  req.user.isStudent = false;
  req.user.isTeacher = false;
  req.user.isAdmin = false;
  req.logout();
  req.session.auth = false;

  
 
  req.session.temp_course_id = null;
  const url = req.headers.referer || "/";
  res.redirect(url);
});

module.exports = router;
