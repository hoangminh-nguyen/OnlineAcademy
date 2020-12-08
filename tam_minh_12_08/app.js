const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');

const app = express();

app.use(morgan('dev'));
app.engine('hbs', exphbs({
  // defaultLayout: 'main.hbs',
  defaultLayout: 'bs4.hbs'
}));
app.set('view engine', 'hbs');
app.use(express.urlencoded({
  extended: true
}));

app.use(express.static('public'));

app.get('/', function (req, res) {
  // res.send('Hello World!');
  res.render('home');
});

app.get('/about', function (req, res) {
  res.render('about');
})

app.get('/bs4', function (req, res) {
  res.sendFile(__dirname + '/bs4.html');
});

app.use('/admin/categories/', require('./controllers/category.route'));

const PORT = 3000;
app.listen(PORT, function () {
  console.log(`E-Commerce app is listening at http://localhost:${PORT}`)
})
