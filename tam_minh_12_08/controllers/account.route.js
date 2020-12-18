const express = require('express');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const userModel = require('../models/account.model');
//const auth = require('../middlewares/auth.mdw');

const router = express.Router();

// router.get('/profile', auth, function (req, res, next) {
//   res.render('vwAccount/profile');
// })

router.get('/sign_up', function (req, res, next) {
  res.render('vwAccount/sign_up',{
    layout: false
  });
})

router.post('/sign_up', async function (req, res, next) {
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
  }
  await userModel.add(user);
  await userModel.addStudent(student);
  res.redirect("/");
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

// router.get('/login', function (req, res) {
//   res.render('vwAccount/login', {
//     layout: false
//   });
// })

// router.post('/login', async function (req, res) {
//   const user = await userModel.singleByUserName(req.body.username);
//   if (user === null) {
//     return res.render('vwAccount/login', {
//       layout: false,
//       err_message: 'Invalid username.'
//     });
//   }

//   const ret = bcrypt.compareSync(req.body.password, user.password);
//   if (ret === false) {
//     return res.render('vwAccount/login', {
//       layout: false,
//       err_message: 'Invalid password.'
//     });
//   }

//   req.session.auth = true;
//   req.session.authUser = user;

//   const url = req.session.retUrl || '/';
//   res.redirect(url);
// })

// router.post('/logout', async function (req, res) {
//   req.session.auth = false;
//   req.session.authUser = null;
//   req.session.retUrl = null;

//   const url = req.headers.referer || '/';
//   res.redirect(url);
// })

module.exports = router;