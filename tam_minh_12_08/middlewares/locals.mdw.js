const specModel = require('../models/spec.model');
const courseModel = require('../models/course.model');

module.exports = function (app) {
    app.use(async function (req, res, next) {
        var cate_spec=[];
        var type = await specModel.getType();
        for (let index = 0; index < type.length; index++) {
            let spec = await specModel.getSpecbyType(type[index].type_id);
            cate_spec.push({
                name: type[index].type_name,
                id: type[index].type_id,
                spec: spec
            })
        }
        res.locals.lcSpec = cate_spec;
        res.locals.lcBestseller = await courseModel.topBestseller();
        next();
    });

    app.use(function (req, res, next) {
        if (req.user === 'null') {
            res.locals.auth = false;
            console.log("asd");
        }
        else {
        res.locals.message = req.user.message;

        res.locals.auth = req.user.auth;
        res.locals.authUser = req.user;

        res.locals.isStudent = req.user.isStudent;
        res.locals.isTeacher = req.user.isTeacher;
            res.locals.isAdmin = req.user.isAdmin;
        }
        next();
      });

}
