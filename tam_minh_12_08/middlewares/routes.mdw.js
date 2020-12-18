module.exports = function (app) {
    // app.get('/', function (req, res) {

    //     res.render('home');
    // });

    // app.use('/products/', require('../controllers/product-fe.route'));

    // app.use('/admin/categories/', require('../controllers/category.route'));
    // app.use('/admin/products/', require('../controllers/product.route'));
    //app.use(express.static('public'));
    
    app.use('/', require('../controllers/home.route'));
    app.use('/courses/', require('../controllers/courses.route'));

    app.use('/account/', require('../controllers/account.route'));
    app.get('/err', function (req, res) {
        throw new Error('Error!');
    });

    app.use(function (req, res) {
        res.render('404', {
            layout: false
        });
    });
}
