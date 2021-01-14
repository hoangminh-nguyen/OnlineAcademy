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
var jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

router.get('/info', async function (req, res, next) {
    res.render('vwStudent/info', {
    });
})
router.get('/info/is-email-available', async function (req, res) {
    const email = req.query.email;

    console.log(email);

    const user = await accountModel.checkAvailableEmail(email);
    if (user.length === 0 || (user.length === 1 && email === req.user.authUser.email)) {
      return res.json(true);
    }
    res.json(false);
  })

router.post("/info/patch", async function(req, res) {
    if(req.body.email != req.user.authUser.email){
      var token = jwt.sign({ oldemail: req.user.authUser.email, newemail: req.body.email }, 'changeemail');
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
    
      var url = `http://localhost:3000/student/?token=${token}`;
    
      let info = await transporter.sendMail({
        from: '"Online Academy Helper" <onlineacademy.helper@gmail.com>',
        to: req.body.email,
        subject: "Online Academy - Verify your account ",
        html: `Hello ${req.user.authUser.fname} ${req.user.authUser.lname},<br><br>Thank you for interest in Online Academy!<br><br>To confirm that you want to use this email address for Online Academy, please kindly click the verification link below:<br><br><a href="${url}">${url}</a><br><br>Cheers,<br><br>Online Academy Team`,
      });
    }
    req.body.email = req.user.authUser.email;
    await studentModel.patch(req.body);
    
    req.user.authUser = await studentModel.studentInfo(req.body.email);
    //res.locals.authUser = req.user.authUser;
    res.redirect("/student/info");
});

router.get("/", async function(req, res) {
  var token = req.query.token;
  const decode = jwt.verify(token, 'changeemail');
  console.log(decode);
  var oldemail = decode.oldemail;
  var newemail = decode.newemail;
  console.log(oldemail + newemail);


  // Tạo account với email mới rồi xóa account có email cũ
  const user = {
    email: newemail,
    password: req.user.authUser.password,
    activate: 1,
    mode: 2, //student
  };
  await accountModel.add(user);
  await studentModel.patch({student_id: req.user.authUser.student_id, email: newemail});
  await accountModel.del(oldemail);
  
  req.session.auth = false;
  req.session.temp_course_id = null;

  req.session.message = "Email verified. Please login with new email.";
   //log out
   req.logout();
  return res.redirect('/account/login');
});








router.get('/info/password', async function (req, res, next) {
    const user = await accountModel.single(req.user.authUser.email);
    var hasPassword;
    if (user.password === null) hasPassword = false;
    else hasPassword = true;
    res.render('vwStudent/password', {
      hasPassword
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

    if (user.password === null){
      return res.json(true);
    }
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