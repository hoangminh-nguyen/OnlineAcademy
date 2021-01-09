const express = require('express');
const multer = require('multer');
const courseModel = require('../models/course.model');
const studentModel = require('../models/student.model');
const teacherModel = require('../models/teacher.model');
const discount = require('../utils/discount');
const accountModel = require("../models/account.model");
const { calcNextPage } = require('../utils/pagination');
const pagination = require('../utils/pagination');
const bcrypt = require("bcryptjs");


const router = express.Router();

router.get('/', function (req, res) {
    res.render('vwTeacher/index');
  })

  router.get('/create_course', function (req, res) {
    res.render('vwTeacher/create_course');
  })

  router.post('/create_course', function (req, res) {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './course/'+req.body.title);
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
        // cb(null, file.fieldname + '-' + Date.now())
      }
    });

    const upload = multer({ storage: storage });
    upload.single('inputGroupFile04')(req, res, function (err) {
      console.log(req.body);
      console.log(req.body.description);
      if (err) {
        console.log(err);
      } else {
        res.render('vwTeacher/create_course');
      }
    });
  })

router.get('/info', async function (req, res, next) {
    res.locals.authUser = req.session.authUser;
    res.render('vwStudent/info', {
    });
})

router.get('/info/is-email-available', async function (req, res) {
  const email = req.query.email;

  console.log(email);

  const user = await accountModel.single(email);
  if (user === null) {
    return res.json(true);
  }
  res.json(false);
})

router.post("/info/patch", async function(req, res) {
  if(req.body.email != req.session.authUser.email){
      const user = {
          email: req.body.email,
          password: req.session.authUser.password,
          mode: 1,
        };
        await accountModel.add(user);
  }
  await teacherModel.patch(req.body);
  await accountModel.del(req.session.authUser.email);
  req.session.authUser = await teacherModel.teacherInfo(req.body.email);
  res.locals.authUser = req.session.authUser;
  res.redirect("/teacher/info");
});

router.get('/info/password', async function (req, res, next) {
    res.render('vwStudent/password', {
    });
})
router.post('/info/password', async function (req, res, next) {
  var account = req.body;
  console.log(account);
  account["password"] = bcrypt.hashSync(req.body.newpassword, 10);
  console.log(account);
  delete account.oldpassword;
  delete account.newpassword;
  await accountModel.patch(account);
  res.redirect("/teacher/info");
})

router.get('/info/password/is-true', async function (req, res) {
  const mail = req.session.authUser.email;
  const password = req.query.password;

  console.log(mail, password);

  const user = await accountModel.single(mail);
  const ret = bcrypt.compareSync(password, user.password);
  if (ret === false) {
    return res.json(false);
  }
  res.json(true);
})

module.exports = router;
