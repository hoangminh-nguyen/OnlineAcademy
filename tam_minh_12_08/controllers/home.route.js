const express = require('express');
const courseModel = require('../models/course.model');
const { getType, getSpecbyType } = require('../models/spec.model');
const specModel = require('../models/spec.model');
const router = express.Router();

router.get('/', async function (req, res, next) {
    var newest = await courseModel.topTenNewest();
    var viewed = await courseModel.topTenViewed();
    var rating = await courseModel.topFiveRating();


    for (let i = 0; i < newest.length; i++) {
        var newprice = (newest[i].price * (100 - newest[i].discount) / 100);
        newest[i]["newprice"] = newprice;
    }

    for (let i = 0; i < rating.length; i++) {
        var newprice = (rating[i].price * (100 - rating[i].discount) / 100);
        rating[i]["newprice"] = newprice;
    }

    for (let i = 0; i < viewed.length; i++) {
        var newprice = (viewed[i].price * (100 - viewed[i].discount) / 100);
        viewed[i]["newprice"] = newprice;
    }

    res.render('home', {
        newest: newest,
        viewed: viewed,
        rating: rating,
    });

});

module.exports = router;
