const express = require("express");
const router = express.Router();
const specModel = require("../models/spec.model");
const typeModel = require("../models/type.model");
const courseModel = require("../models/course.model");

router.get("/", async function(req, res, next) {
  if (req.user.isAdmin === false) {
    return res.redirect("/");
  }

  courses = await courseModel.all();

  res.render("vwCourses-ad/index", {
    courses
  });
});

module.exports = router;
