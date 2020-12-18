const exphbs = require('express-handlebars');
const numeral = require('numeral');

const hbs_sections = require('express-handlebars-sections');
const moment = require('moment')

module.exports = function (app) {
    app.engine('hbs', exphbs({
        defaultLayout: 'main.hbs',
        helpers: {
            section: hbs_sections(),
            
            format_number(val) {
                return numeral(val).format('0,0');
            },

            format_date(val) {
                return moment(val).format('lll');
            },

            format_date_diff(val) {
                return moment(val).fromNow();
            },
        }
    }));
    app.set('view engine', 'hbs');
}
