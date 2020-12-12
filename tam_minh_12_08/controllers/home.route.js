const express = require('express');
const productModel = require('../models/courses.model');

const router = express.Router();

router.get('/', async function (req, res, next) {
    var newest = await productModel.topTenNewest();
    var viewed = await productModel.topTenViewed();
    var rating = await productModel.topFiveRating();

    console.log(typeof (newest));

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

    console.log(newest);
    res.render('home', {
        newest: newest,
        viewed: viewed,
        rating: rating,
    });
    // try {
    //   const list = await productModel.all();
    //   res.render('vwProducts/index', {
    //     products: list,
    //     empty: list.length === 0
    //   });
    // } catch (err) {
    //   next(err);
    //   // console.error(err);
    //   // res.send('err');
    // }
})

module.exports = router;
