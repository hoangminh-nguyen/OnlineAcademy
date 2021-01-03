const express = require('express');
const courseModel = require('../models/course.model');
const studentModel = require('../models/student.model');
const discount = require('../utils/discount');
const { calcNextPage } = require('../utils/pagination');
const pagination = require('../utils/pagination');
const router = express.Router();

router.get('/registeredcourses/:studentid', async function (req, res, next) {
    const student_id = req.params.studentid;
    var course = await courseModel.allByStudentIDRegister(student_id);
    course = discount.calcCourses(course);
    res.render('vwStudent/savedcourses', {
        course,
        numberCourse: course.length,
    });
})

router.get('/watchlist/:studentid', async function (req, res, next) {
    const student_id = req.params.studentid;
    var course = await courseModel.allByStudentIDWatchlist(student_id);
    course = discount.calcCourses(course);
    
    res.render('vwStudent/watchlist', {
        student_id,
        course,
        numberCourse: course.length,
    });
})

router.get('/watchlist/:studentid/del', async function (req, res, next) {
    const student_id = parseInt(req.params.studentid);
    const course_id = parseInt(req.query.courseid);
    await studentModel.delWatchlistItem(course_id, student_id);

    const url = `/student/watchlist/${student_id}`;
    console.log(url);
    res.redirect(url);
})
router.get('/watchlist/:studentid/delall', async function (req, res, next) {
    const student_id = parseInt(req.params.studentid);
    await studentModel.delWatchlist(student_id);

    const url = `/student/watchlist/${student_id}`;
    console.log(url);
    res.redirect(url);
})
module.exports = router;