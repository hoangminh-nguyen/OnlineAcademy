const express = require('express');
const courseModel = require('../models/course.model');
const discount = require('../utils/discount');
const { calcNextPage } = require('../utils/pagination');
const pagination = require('../utils/pagination');

const router = express.Router();

router.get('/detail/:id', async function (req, res, next) {
    const course_id = +req.params.id;
    const course = await courseModel.single(course_id);
    const review = await courseModel.allReviewByID(course_id);
    const chapter = await courseModel.allChapterbyID(course_id);
    if (course === null) {
        return res.redirect('/');
    }

    var register = await courseModel.topFiveRegisterInSpec(course["spec"]);
    register = discount.calcCourses(register);

    course["newprice"] = discount.calc(course);

    res.render('vwCourses/detail', {
        course: course,
        spec_name: course["spec_name"],
        register: register,
        review: review,
        full_info: course["full_info"],
        chapter: chapter,
    });
})

router.get('/all', async (req, res) => {
    const page = req.query.page || 1;
    if (page < 1) page = 1;

    const total = await courseModel.countAll();

    const page_numbers = pagination.calcPageNumbers(total, page);
    const offset = pagination.calcOffset(page);
    const next_page = calcNextPage(page, page_numbers);

    var all = await courseModel.pageAll(offset);
    all = discount.calcCourses(all);

    res.render('vwCourses/all', {
        course: all,
        page_numbers,
        next_page,
    })
})

router.get('/:type', async (req, res) => {
    const page = req.query.page || 1;
    if (page < 1) page = 1;
    const type = req.params.type;

    const total = await courseModel.countByTypeName(type);

    const page_numbers = pagination.calcPageNumbers(total, page);
    const offset = pagination.calcOffset(page);
    const next_page = calcNextPage(page, page_numbers);

    var all = await courseModel.pageByTypeName(type, offset);
    all = discount.calcCourses(all);

    res.render('vwCourses/all', {
        course: all,
        page_numbers,
        next_page
    })
})

router.get('/:type/:spec_name', async (req, res) => {
    const page = req.query.page || 1;
    if (page < 1) page = 1;
    const spec = req.params.spec_name;

    const total = await courseModel.countBySpecName(spec);

    const page_numbers = pagination.calcPageNumbers(total, page);
    const offset = pagination.calcOffset(page);
    const next_page = calcNextPage(page, page_numbers);

    var all = await courseModel.pageBySpecName(spec, offset);
    all = discount.calcCourses(all);


    res.render('vwCourses/all', {
        course: all,
        page_numbers,
        next_page
    })
})

module.exports = router;
