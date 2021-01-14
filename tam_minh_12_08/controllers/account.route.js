// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const express = require("express");
const bcrypt = require("bcryptjs");
const userModel = require("../models/account.model");
const studentModel = require("../models/student.model");
const teacherModel = require('../models/teacher.model');
const auth = require("../middlewares/auth.mdw");
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var jwt = require('jsonwebtoken');
const router = express.Router();
const nodemailer = require("nodemailer");
const accountModel = require("../models/account.model");

router.get('/forgotpass', function (req, res, next) {
  res.render('vwAccount/forgotpass', {
    layout: false,
  });
});

router.post('/forgotpass', async function (req, res, next) {
  const email = req.body.emailaddress;
  var token = jwt.sign({ email: email }, 'forgotpass');
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    //secure: false,
    auth: {
        user: 'onlineacademy.helper@gmail.com',
        pass: 'bxsarjloicaddcyh'
    }
  });

  var url = `https://online-academy-se.herokuapp.com/account/resetpass?token=${token}`;

  let info = await transporter.sendMail({
    from: '"Online Academy Helper" <onlineacademy.helper@gmail.com>',
    to: email,
    subject: "Online Academy - Verify your account ",
    html: `Thank you for interest in Online Academy!<br><br>Click the link below to reset your password:<br><br><a href="${url}">${url}</a><br><br>Cheers,<br><br>Online Academy Team`,
  });
  res.redirect("/account/login");
});

router.get("/resetpass", async function(req, res) {
  var token = req.query.token;
  const decode = jwt.verify(token, 'forgotpass');
  res.render('vwAccount/resetpass', {
    layout: false,
    email: decode.email,
  });
});


router.post("/resetpass", async function(req, res) {
  var account = req.body;
  account["password"] = bcrypt.hashSync(req.body.password, 10);
  delete account.passwordcheck;
  await accountModel.patch(account);
  return res.redirect('/account/login');
});

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
    activate: 0,
    mode: 2, //student
  };
  const student = {
    student_id: null,
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.emailaddress,
    link_ava_student:
      "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png",
    disable: 0,
  };
  await userModel.add(user);
  await studentModel.add(student);

  var token = jwt.sign({ email: user.email }, 'singup');
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    //secure: false,
    auth: {
        user: 'onlineacademy.helper@gmail.com',
        pass: 'bxsarjloicaddcyh'
    }
  });

  var url = `https://online-academy-se.herokuapp.com/account/?token=${token}`;

  let info = await transporter.sendMail({
    from: '"Online Academy Helper" <onlineacademy.helper@gmail.com>',
    to: user.email,
    subject: "Online Academy - Verify your account ",
    html: `Hello ${student.fname} ${student.lname},<br><br>Thank you for interest in Online Academy!<br><br>To confirm that you want to use this email address for Online Academy, please kindly click the verification link below:<br><br><a href="${url}">${url}</a><br><br>Cheers,<br><br>Online Academy Team`,
  });

  req.session.message = "Please verify your email account.";

  res.redirect("/account/login");
});

router.get("/", async function(req, res) {
  var token = req.query.token;
  const decode = jwt.verify(token, 'singup');
  console.log(decode);
  await accountModel.activate(decode.email);
  req.session.message = "Email verified. Please login.";
  return res.redirect('/account/login');
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
  req.session.message = "";
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

  req.session.auth = false;



  req.session.temp_course_id = null;
  const url = req.headers.referer || "/";
  req.logout();
  res.redirect(url);
});

module.exports = router;
