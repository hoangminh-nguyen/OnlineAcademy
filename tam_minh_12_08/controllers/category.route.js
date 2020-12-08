const express = require('express');
const categoryModel = require('../models/category.model');

const router = express.Router();

router.get('/', function (req, res) {
  const list = categoryModel.all();
  res.render('vwCategories/index', {
    categories: list,
    empty: list.length === 0
  });
})

router.get('/add', function (req, res) {
  res.render('vwCategories/add');
})

router.post('/add', function (req, res) {
  const new_category = {
    CatID: -1,
    CatName: req.body.CatName
  }
  categoryModel.add(new_category);
  res.render('vwCategories/add');
})

module.exports = router;