const express = require('express');
const courseModel = require('../models/course.model');
const { getType, getSpecbyType } = require('../models/spec.model');
const specModel = require('../models/spec.model');
const router = express.Router();
const discount = require('../utils/discount');
const bestseller = require('../utils/bestseller');


router.get('/', async function (req, res, next) {
    var newest = await courseModel.topTenNewest();
    var viewed = await courseModel.topTenViewed();
    var rating = await courseModel.topFiveRating();
    const spec = await specModel.getSpecMostStuReLast7Days();
    //const spec = await specModel.test();
    
    newest = discount.calcCourses(newest);
    viewed = discount.calcCourses(viewed);
    rating = discount.calcCourses(rating);

    bestseller.labelBestseller(res.locals.lcBestseller, rating);
    bestseller.labelBestseller(res.locals.lcBestseller, newest);
    bestseller.labelBestseller(res.locals.lcBestseller, viewed);

    res.render('home', {
        newest: newest,
        viewed: viewed,
        rating: rating,
        spec: spec,
    });

    req.session.temp_course_id = null;
});

module.exports = router;
