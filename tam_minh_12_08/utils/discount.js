module.exports = {
    calc(course) {
        return (course.price * (100 - course.discount) / 100);
    },

    calcCourses(courses) {
        for (let i = 0; i < courses.length; i++) {
            courses[i]["newprice"] = this.calc(courses[i]);
        }
        return courses;
    }
};
