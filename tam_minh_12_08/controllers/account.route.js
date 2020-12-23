const express = require('express');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const userModel = require('../models/account.model');
const auth = require('../middlewares/auth.mdw');

const router = express.Router();

// router.get('/profile', auth, function (req, res, next) {
//   res.render('vwAccount/profile');
// })

router.get('/signup', function (req, res, next) {
  if(req.session.auth === true){
    return res.redirect('/');
  }
  res.render('vwAccount/signup',{
    layout: false
  });
})

router.post('/signup', async function (req, res, next) {
  if(req.session.auth === true){
    return res.redirect('/');
  }
  const hash = bcrypt.hashSync(req.body.password, 10);
  const user = {
    password: hash,
    email: req.body.emailaddress,
    mode: 2
  }
  const student ={
    student_id : null,
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.emailaddress,
    link_ava_student: "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png",
  }
  await userModel.add(user);
  await userModel.addStudent(student);
  res.redirect('/account/login');
})

router.get('/is-available', async function (req, res) {
  const email = req.query.email;
  console.log(email);
  const user = await userModel.single(email);
  if (user === null) {
    return res.json(true);
  }

  res.json(false);
})

router.get('/login', function (req, res) {
  if(req.session.auth === true){
    return res.redirect('/');
  }
  res.render('vwAccount/login', {
    layout: false
  });
})

router.post('/login', async function (req, res) {
  const user = await userModel.single(req.body.email);
  if (user === null) {
    return res.render('vwAccount/login', {
      layout: false,
      err_message: 'Email does not match any account.'
    });
  }

  const ret = bcrypt.compareSync(req.body.password, user.password);
  if (ret === false) {
    return res.render('vwAccount/login', {
      layout: false,
      err_message: 'Invalid password.'
    });
  }
  //Lấy thông tin người dùng
  var userInfo;
  if (user.mode === 2){
    userInfo = await userModel.studentInfo(user.email);
  }
  else if (user.mode === 1){
    userInfo = await userModel.teacherInfo(user.email);
  }

  req.session.auth = true;
  req.session.authUser = userInfo;
  const url = req.session.retUrl || '/';
  res.redirect(url);
})

router.post('/logout', async function (req, res) {
  req.session.auth = false;
  req.session.authUser = null;
  req.session.retUrl = null;
  const url = req.headers.referer || '/';
  res.redirect(url);
})

module.exports = router;
