const express = require('express');
const router = express.Router();
const accountModel = require('../models/account.model');
const typeModel = require('../models/type.model');
const courseModel = require('../models/course.model');

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

module.exports = router;
