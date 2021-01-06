const express = require('express');
const multer = require('multer');


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
      if (err) {
        console.log(err);
      } else {
        res.render('vwTeacher/create_course');
      }
    });
  })

  module.exports = router;