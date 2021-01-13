const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const { mysql } = require('../config/default.json');

module.exports = function (app) {
  const sessionCourse = new MySQLStore(mysql);

  app.set('trust proxy', 1)
  app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    store: sessionCourse,
    cookie: {
      // secure: true
    }
  }));
}
