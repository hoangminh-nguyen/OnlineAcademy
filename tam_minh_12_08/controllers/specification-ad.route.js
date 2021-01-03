const express = require("express");
const router = express.Router();
const specModel = require("../models/spec.model");
const typeModel = require("../models/type.model");
const courseModel = require("../models/course.model");

router.get("/", async function(req, res, next) {
  if (req.session.isAdmin === false) {
    return res.redirect("/");
  }
  res.render("vwSpecifications-ad/index", {});
});

router.get("/edit", async function(req, res) {
  const id = req.query.spec_id;
  const spec = await specModel.single(id);

  if (spec === null) {
    return res.redirect("/admin/specifications");
  }

  res.render("vwSpecifications-ad/edit", {
    spec,
  });
});

router.get("/add", async function(req, res) {
  const id = req.query.type_id;
  const type = await typeModel.single(id);

  res.render("vwSpecifications-ad/add", {
    type,
  });
});

router.post("/add", async function(req, res) {
  const id = req.query.type_id;
  const entity = req.body;

  entity["type_id"] = parseInt(id);

  await specModel.add(entity);
  res.redirect("/admin/specifications");
});

router.get("/is-delete-able", async function(req, res) {
  const course = await courseModel.allBySpec(req.query.spec_id);

  if (course.length === 0) {
    return res.json(true);
  }

  res.json(false);
});

router.post("/del", async function(req, res) {
  await specModel.del(req.body.spec_id);
  res.redirect("/admin/specifications");
});

router.post("/patch", async function(req, res) {
  await specModel.patch(req.body);
  res.redirect("/admin/specifications");
});

module.exports = router;
