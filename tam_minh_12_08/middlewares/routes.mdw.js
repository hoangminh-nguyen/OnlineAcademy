const productModel = require('../models/product.model');
const express = require('express')
module.exports = function (app) {
    // app.get('/', function (req, res) {

    //     res.render('home');
    // });

    // app.use('/products/', require('../controllers/product-fe.route'));

    // app.use('/admin/categories/', require('../controllers/category.route'));
    // app.use('/admin/products/', require('../controllers/product.route'));
    //app.use(express.static('public'));
    app.use('/', require('../controllers/home.route'));

    app.get('/err', function (req, res) {
        throw new Error('Error!');
    })

    app.use(function (req, res) {
        res.render('404', {
            layout: false
        });
    });
}
