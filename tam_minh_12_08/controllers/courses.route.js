const express = require('express');
const courseModel = require('../models/course.model');

const router = express.Router();

router.get('/detail/:id', async function (req, res, next) {
    const course_id = +req.params.id;
    const course = await courseModel.single(course_id);
    const review = await courseModel.allReviewByID(course_id);
    if (course === null) {
        return res.redirect('/');
    }

    var register = await courseModel.topFiveRegisterInSpec(course["spec"]);
    for (let i = 0; i < register.length; i++) {
        var newprice = (register[i].price * (100 - register[i].discount) / 100);
        register[i]["newprice"] = newprice;
    }

    var newprice = (course.price * (100 - course.discount) / 100);
    course["newprice"] = newprice;

    res.render('vwCourses/detail', {
        course: course,
        spec_name: course["spec_name"],
        register: register,
        review: review
    });
})

router.get('/all', async (req, res) => {
    var all = await courseModel.all();
    for (let i = 0; i < all.length; i++) {
        var newprice = (all[i].price * (100 - all[i].discount) / 100);
        all[i]["newprice"] = newprice;
    }

    res.render('vwCourses/all',{ 
        course: all
    })
})

module.exports = router;
