const { paginate } = require('../config/default.json');

module.exports = {
    calcOffset(page) {
        return (page - 1) * paginate.limit
    },

    calcPageNumbers(total, page) {
        let nPages = Math.floor(total / paginate.limit);
        if (total % paginate.limit > 0) nPages++;

        const page_numbers = [];
        for (i = 1; i <= nPages; i++) {
            page_numbers.push({
                value: i,
                isCurrentPage: i === +page
            });
        }
        return page_numbers;
    },

    calcNextPage(page, page_numbers) {
        const pg = parseInt(page);
        if ((pg + 1) > page_numbers.length)
            return pg;
        return pg + 1;
    }
};
