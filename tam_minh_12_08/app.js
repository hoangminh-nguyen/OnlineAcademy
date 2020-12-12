const express = require('express');
const morgan = require('morgan');
require('express-async-errors');

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({
  extended: true
}));


app.use(express.static('public'));

require('./middlewares/view.mdw')(app);
//require('./middlewares/locals.mdw')(app);
require('./middlewares/routes.mdw')(app);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.render('500', {
    layout: false
  })
})

const PORT = 3000;
app.listen(PORT, function () {
  console.log(`E-Commerce app is listening at http://localhost:${PORT}`)
})
