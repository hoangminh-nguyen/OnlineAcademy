const express = require('express');
const router = express.Router();
const accountModel = require('../models/account.model');
const courseModel = require('../models/course.model');
const studentModel = require('../models/student.model');
const teacherModel = require('../models/teacher.model');

router.get('/', async function (req, res, next) {
    const teacher = await accountModel.allTeacher();
    const student = await accountModel.allStudent();

    res.render('vwAccount/index', {
        teacher,
        student
    });

});

router.get('/edit', async function (req, res) {
    const email = req.query.email;
    const acc = await accountModel.single(email);
    const mode = acc["mode"];

    var info;
    if (mode === 2) {
        info = await accountModel.studentInfo(email);
    } else {
        info = await accountModel.teacherInfo(email);
    }

    if (info === null) {
        return res.redirect('/admin/accounts');
    }

    res.render('vwAccount/edit', {
        info,
        isStudent: mode === 2,
    });
})

router.post('/patch', async function (req, res) {
    const mode = parseInt(req.query.mode);

    if (mode === 1) {
        await teacherModel.patch(req.body);
        console.log("teacher");
    } else {
        await studentModel.patch(req.body);
        console.log("student");
    }

    res.redirect('/admin/accounts');
})

router.post('/del', async function (req, res) {
    const mode = parseInt(req.query.mode);

    console.log(mode);

    if (mode === 1) {
        const id_courses = await courseModel.allCourseIDByTeacherID(req.body.teacher_id);

        console.log(id_courses);

        for (let i = 0; i < id_courses.length; i++) {
            await courseModel.delCourseByCourseID(id_courses[i]['course_id']);
        }

        await teacherModel.del(req.body.teacher_id);
    } else {

        await studentModel.del(req.body.student_id);
    }

    await accountModel.del(req.body.email);

    res.redirect('/admin/accounts');
})


module.exports = router;
