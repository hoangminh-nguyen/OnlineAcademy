module.exports = {
  auth(req, res, next) {
    if (req.session.auth === false) {
      req.session.retUrl = req.originalUrl;
      return res.redirect('/account/login');
    }
    next();
  },
  checkAdmin(req, res, next) {
    if (req.session.auth === false || req.session.isAdmin === false) {
      req.session.retUrl = req.originalUrl;
      return res.redirect('/');
    }
    next();
  },
  checkStudent(req, res, next) {
    if (req.session.auth === false || req.session.isStudent === false) {
      req.session.retUrl = req.originalUrl;
      return res.redirect('/');
    }
    next();
  },
  checkTeacher(req, res, next) {
    if (req.session.auth === false || req.session.isTeacher === false) {
      req.session.retUrl = req.originalUrl;
      return res.redirect('/');
    }
    next();
  },
}