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
const date = require("../utils/date");
const fs = require('fs');
const db = require('../utils/db');
const { RSA_NO_PADDING } = require('constants');

const router = express.Router();

router.get('/',  function (req, res) {
  res.render('vwTeacher/index');
})

router.get('/create_course',async function (req, res) {
  if (req.session.temp_course_id){
    console.log("course_id "+req.session.temp_course_id);
    const course = await courseModel.load_info(req.session.temp_course_id);
    console.log(course);
    
  res.render('vwTeacher/create_course',{
    course,
    check: true,
  });
  }
  else {
    console.log("null course");
    const course={
      name : "", 
      price: "",
      type: "",
      spec: "",
      short_info :"",
      full_info : "",
    };
    
  res.render('vwTeacher/create_course',{
    course,
    check: false,
  });
  }
})

router.post('/create_course', async function (req, res, next) {    
  if(req.session.temp_course_id){
    console.log("caccccc");
    const course={
      name : req.body.name, 
      price: req.body.price,
      type: parseInt(req.body.type),
      spec: parseInt(req.body.spec_id),
    };
    console.log(course);
    const detail = {
      short_info :req.body.short_info, 
      full_info : req.body.full_info,
    };
    const condition = {
      course_id: req.session.temp_course_id,
    };
    await db.patch(course, condition,"course");
    await db.patch(detail, condition,"course_detail");
    res.redirect('/teacher/add_pic');
  }
  else {
    const course={
      name : req.body.name, 
      price: req.body.price,
      type: parseInt(req.body.type),
      spec: parseInt(req.body.spec_id),
      view_number: 0,
      discount: 0,
      teacher_id: req.session.authUser.teacher_id,
      publish_day: date.curDate(),
      link_ava_course: null,
    };
  
    await courseModel.add(course);
    const id = await courseModel.idByCourseName(course.name);
    req.session.temp_course_id = id[0]['course_id'];
  
    const detail = {
      state: 0,
      course_id : req.session.temp_course_id,
      short_info :req.body.short_info, 
      full_info : req.body.full_info,
      last_modify: date.curDate(),
    }
    await db.add(detail,"course_detail");
  
    res.redirect('/teacher/add_pic');
  }
}
);
  
  router.post('/add_pic', async function (req, res, next){
    const id = req.session.temp_course_id;
    const pathz = '/course/'+id+'/Profile pic.png';
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        
        const path = './public/course/'+id;
        fs.mkdirSync(path, { recursive: true });
        cb(null, path);
      },
      filename: function (req, file, cb) {
        cb(null, "Profile pic.png");
        // cb(null, file.fieldname + '-' + Date.now())
      }
    });
    const upload = multer({ storage: storage });
    upload.single('inputGroupFile04')(req, res, async function (err) {
      if (err) {
        console.log(err);
      } else {
        const condition = {
          course_id: id,
        };
    
        const course = {
          link_ava_course : pathz,
        }
    
        await db.patch(course,condition, "course");
        res.redirect('/teacher/add_chap')
      }
    });
  });
  




router.get('/add_pic', async function (req, res, next){
  const course = await courseModel.single(req.session.temp_course_id);
  console.log(course);
  res.render('vwTeacher/picture_add',{course,});
})

router.get('/add_chap', async function (req, res, next){
  const course = await courseModel.load_chapter(req.session.temp_course_id);

  res.render('vwTeacher/chapter_add', {
    course,
  });
})

router.post('/add_chap', async function (req, res, next){

  if(req.body.checker){
    console.log(req.body);
    console.log("abbb");
    var check = true;

    const id = parseInt(req.body.checker);
    var chapter = await courseModel.load_chapter_info(req.session.temp_course_id,id);
    if (req.body.Chapter_number=="delete"){
      check = false;
    }
    
    await courseModel.delete_chap( req.session.temp_course_id,parseInt(id));
    const course = await courseModel.load_chapter(req.session.temp_course_id);
    
    res.render('vwTeacher/chapter_add', {chapter, check,course,})
  }
  else {
    const id = req.session.temp_course_id;
    var pathz = '/course/'+id+'/';
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        
        const path = './public/course/'+id;
        fs.mkdirSync(path, { recursive: true });
        cb(null, path);
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
        pathz = pathz + file.originalname;
        // cb(null, file.fieldname + '-' + Date.now())
      }
    });
    const upload = multer({ storage: storage });
    upload.single('inputGroupFile06')(req, res, async function (err) {
      console.log(req.body);
      console.log("cdddd")
      const chap={
        chap_name : req.body.title_chapter, 
        chap_num : req.body.Chapter_number,
        course_id : req.session.temp_course_id,
        chap_des: req.body.description_chapter,
        link_vid : pathz,
      };
      if (err) {
        console.log(err);
      } else {
      
        
    
        await db.add(chap, "course_chapter");
        res.redirect('/teacher/add_chap')
      }
    });
  }
      
  
})

router.get('/finish',async function (req, res, next){
  var course = await courseModel.single(req.session.temp_course_id);

  res.render('vwTeacher/finish_check', {
    course,
  });
})

router.post('/finish',async function (req, res, next){
  const condition = {
    course_id: req.session.temp_course_id,
  };

  const course = {
    state : req.body.stream_ss1,
  }

  await db.patch(course,condition, "course_detail");
  req.session.temp_course_id = null;
  res.redirect('/');
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
