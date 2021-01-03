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
}