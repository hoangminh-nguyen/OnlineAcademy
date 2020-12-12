const exphbs = require('express-handlebars');
const numeral = require('numeral');
const moment = require('moment')

module.exports = function (app) {
    app.engine('hbs', exphbs({
        defaultLayout: 'main.hbs',
        helpers: {
            format_number(val) {
                return numeral(val).format('0,0');
            },

            format_date(val) {
                return moment(val).format('lll')
            }
        }
    }));
    app.set('view engine', 'hbs');
}
