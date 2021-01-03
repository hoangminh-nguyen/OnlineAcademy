const express = require('express');
const courseModel = require('../models/course.model');
const studentModel = require('../models/student.model');
const discount = require('../utils/discount');
const { calcNextPage } = require('../utils/pagination');
const pagination = require('../utils/pagination');
const router = express.Router();

router.get('/registeredcourses', async function (req, res, next) {
    const student_id = req.session.authUser.student_id;
    var course = await courseModel.allByStudentIDRegister(student_id);
    course = discount.calcCourses(course);
    res.render('vwStudent/savedcourses', {
        course,
        numberCourse: course.length,
    });
})

router.get('/watchlist', async function (req, res, next) {
    const student_id = req.session.authUser.student_id;
    var course = await courseModel.allByStudentIDWatchlist(student_id);
    course = discount.calcCourses(course);
    
    res.render('vwStudent/watchlist', {
        student_id,
        course,
        numberCourse: course.length,
    });
})

router.get('/watchlist/add', async function (req, res, next) {
    const student_id = parseInt(req.session.authUser.student_id);
    const course_id = parseInt(req.query.courseid);
    const check = await studentModel.findWatchlistItem(course_id, student_id);
    if(!check){
        await studentModel.addWatchlistItem(course_id, student_id);
    }
    const url = req.headers.referer || '/';
    res.redirect(url);
})

router.get('/watchlist/del', async function (req, res, next) {
    const student_id = parseInt(req.session.authUser.student_id);
    const course_id = parseInt(req.query.courseid);
    await studentModel.delWatchlistItem(course_id, student_id);

    res.redirect('/student/watchlist');
})

router.get('/watchlist/delall', async function (req, res, next) {
    const student_id = parseInt(req.session.authUser.student_id);
    await studentModel.delWatchlist(student_id);

    res.redirect('/student/watchlist');
})
module.exports = router;