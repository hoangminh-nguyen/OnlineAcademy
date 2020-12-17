const express = require('express');
const courseModel = require('../models/course.model');
const { getType, getSpecbyType } = require('../models/spec.model');
const specModel = require('../models/spec.model');
const router = express.Router();
const discount = require('../utils/discount');

router.get('/', async function (req, res, next) {
    var newest = await courseModel.topTenNewest();
    var viewed = await courseModel.topTenViewed();
    var rating = await courseModel.topFiveRating();

    newest = discount.calcCourses(newest);
    viewed = discount.calcCourses(viewed);
    rating = discount.calcCourses(rating);

    res.render('home', {
        newest: newest,
        viewed: viewed,
        rating: rating,
    });

});

module.exports = router;
