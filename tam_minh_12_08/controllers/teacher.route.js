const express = require('express');
const courseModel = require('../models/course.model');
const studentModel = require('../models/student.model');
const teacherModel = require('../models/teacher.model');
const discount = require('../utils/discount');
const accountModel = require("../models/account.model");
const { calcNextPage } = require('../utils/pagination');
const pagination = require('../utils/pagination');
const bcrypt = require("bcryptjs");
const router = express.Router();

router.get('/info', async function (req, res, next) {
    res.locals.authUser = req.session.authUser;
    res.render('vwStudent/info', {
    });
})

router.post("/info/patch", async function(req, res) {
    await teacherModel.patch(req.body);
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
    account["password"] = bcrypt.hashSync(req.body.password, 10);
    await accountModel.patch(account);
    res.redirect("/teacher/info");
})

module.exports = router;