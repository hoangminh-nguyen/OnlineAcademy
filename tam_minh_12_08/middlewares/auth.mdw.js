module.exports = {
  auth(req, res, next) {
    if (req.session.auth === false) {
      req.session.retUrl = req.originalUrl;
      return res.redirect('/account/login');
    }
    next();
  },
  checkAdmin(req, res, next) {
    if (res.locals.auth === false || res.locals.isAdmin === false) {
      res.locals.retUrl = req.originalUrl;
      return res.redirect('/');
    }
    next();
  },
  checkStudent(req, res, next) {
    if (res.locals.auth === false || res.locals.isStudent === false) {
      res.locals.retUrl = req.originalUrl;
      return res.redirect('/');
    }
    next();
  },
  checkTeacher(req, res, next) {
    if (res.locals.auth === false || res.locals.isTeacher === false) {
      res.locals.retUrl = req.originalUrl;
      return res.redirect('/');
    }
    next();
  },
}
