const express = require('express');
const courseModel = require('../models/course.model');
const studentModel = require('../models/student.model');
const discount = require('../utils/discount');
const accountModel = require("../models/account.model");
const { calcNextPage } = require('../utils/pagination');
const pagination = require('../utils/pagination');
const bcrypt = require("bcryptjs");
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const db = require('../utils/db');


router.get('/info', async function (req, res, next) {
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
    if(req.body.email != req.user.authUser.email){
        const user = {
            email: req.body.email,
            password: req.user.authUser.password,
            mode: 2,   
          };
          await accountModel.add(user);
    }
    await studentModel.patch(req.body);
    await accountModel.del(req.user.authUser.email);
    req.user.authUser = await studentModel.studentInfo(req.body.email);
    res.locals.authUser = req.user.authUser;
    res.redirect("/student/info");
});

router.get('/info/password', async function (req, res, next) {
    res.render('vwStudent/password', {
    });
})
router.post('/info/password', async function (req, res, next) {
    var account = req.body;
    account["password"] = bcrypt.hashSync(req.body.newpassword, 10);
    delete account.oldpassword;
    delete account.newpassword;
    await accountModel.patch(account);
    res.redirect("/student/info");
})

router.get('/info/password/is-true', async function (req, res) {
    const mail = req.user.authUser.email;
    const password = req.query.password;
    const user = await accountModel.single(mail);
    const ret = bcrypt.compareSync(password, user.password);
    if (ret === false) {
      return res.json(false);
    }
    res.json(true);
  })

router.get('/rating', async function (req, res, next) {
    const course_id = req.query.courseid;
    const course = await courseModel.single(course_id);
    res.render('vwStudent/rating', {
        course,

    });
})
router.post('/rating', async function (req, res, next) {
    const rating = req.body.rating;
    const comment = req.body.comment;
    const course_id = req.query.courseid;
    const student_id = req.user.authUser.student_id;
    var d = new Date();
    var day=d.getDate(), month=(d.getMonth()+1), year=d.getFullYear(), hour=d.getHours(), minute=d.getMinutes(), second=d.getSeconds();
    if (day <10) day="0"+day;
    if (month<10) month="0"+month;
    if (hour<10) hour="0"+hour;
    if (minute<10) minute="0"+minute;
    if (second<10) second="0"+second;
    var date = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
    await studentModel.rating(course_id, student_id, rating, comment, date);
    res.redirect("/student/registeredcourses");
})

router.get('/registeredcourses', async function (req, res, next) {
    const student_id = req.user.authUser.student_id;
    var course = await courseModel.allByStudentIDRegister(student_id);
    course = discount.calcCourses(course);
    res.render('vwStudent/savedcourses', {
        course,
        numberCourse: course.length,
    });
})

router.post('/registeredcourses/add', async function (req, res, next) {
    const student_id = parseInt(req.user.authUser.student_id);
    const course_id = parseInt(req.query.courseid);
    var d = new Date();
    var day=d.getDate(), month=(d.getMonth()+1), year=d.getFullYear(), hour=d.getHours(), minute=d.getMinutes(), second=d.getSeconds();
    if (day <10) day="0"+day;
    if (month<10) month="0"+month;
    if (hour<10) hour="0"+hour;
    if (minute<10) minute="0"+minute;
    if (second<10) second="0"+second;
    var date = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
    await studentModel.addRegisterItem(course_id, student_id, date);
    const url = '/courses/detail/' + course_id;
    res.redirect(url);
})

router.get('/is-not-added', async function (req, res) {
    const student_id = parseInt(req.user.authUser.student_id);
    const course_id = req.query.courseid;
    const check = await studentModel.findRegisterItem(course_id, student_id);
    if (check === null) {
      return res.json(true);
    }
    res.json(false);
  });
  router.get('/info/avatar', async function (req, res, next) {
    const avatar = await studentModel.get_ava(req.user.authUser.student_id);
    res.render('vwStudent/avatar', {
        isStudent: req.user.isStudent,
        avatar,
    });
  });
  
  router.post('/info/avatar', async function (req, res, next) {
    const id = req.user.authUser.student_id;
      const pathz = '/student/'+id+'/ProfilePic.png';
      const storage = multer.diskStorage({
        destination: function (req, file, cb) {
  
          const path = './public/student/'+id;
          fs.mkdirSync(path, { recursive: true });
          cb(null, path);
        },
        filename: function (req, file, cb) {
          cb(null, "ProfilePic.png");
        }
      });
      const upload = multer({ storage: storage });
      upload.single('inputGroupFile04')(req, res, async function (err) {
        if (err) {
          console.log(err);
        } else {
          const condition = {
            student_id: id,
          };
  
          const course = {
            link_ava_student : pathz,
          }
  
          await db.patch(course,condition, "student");
          res.redirect('/student/info')
        }
      });
  });


router.get('/watchlist', async function (req, res, next) {
    const student_id = req.user.authUser.student_id;
    var course = await courseModel.allByStudentIDWatchlist(student_id);
    course = discount.calcCourses(course);
    
    res.render('vwStudent/watchlist', {
        student_id,
        course,
        numberCourse: course.length,
    });
})

router.get('/watchlist/add', async function (req, res, next) {
    const student_id = parseInt(req.user.authUser.student_id);
    const course_id = parseInt(req.query.courseid);
    const check = await studentModel.findWatchlistItem(course_id, student_id);
    if(!check){
        await studentModel.addWatchlistItem(course_id, student_id);
    }
    const url = req.headers.referer || '/';
    res.redirect(url);
})

router.get('/watchlist/del', async function (req, res, next) {
    const student_id = parseInt(req.user.authUser.student_id);
    const course_id = parseInt(req.query.courseid);
    await studentModel.delWatchlistItem(course_id, student_id);

    res.redirect('/student/watchlist');
})

router.get('/watchlist/delall', async function (req, res, next) {
    const student_id = parseInt(req.user.authUser.student_id);
    await studentModel.delWatchlist(student_id);

    res.redirect('/student/watchlist');
})
module.exports = router;