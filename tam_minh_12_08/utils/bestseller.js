module.exports = {
    labelBestseller(lcBestSeller, courses) {
        for (let i = 0; i < courses.length; i++) {
            if (this.checkout(lcBestSeller, courses[i]))
                courses[i]["bestseller"] = 1;
            else
                courses[i]["bestseller"] = null;
        }
        return courses;
    },

    checkout(lcBestSeller, course) {
        for (let i = 0; i < lcBestSeller.length; i++) {
            if (lcBestSeller[i]['course_id'] === course['course_id']) {
                return true;
            }
        }
        return false;
    }
};
