const express = require('express');
const courseModel = require('../models/course.model');
const specModel = require('../models/spec.model');
const typeModel = require('../models/type.model');
const { calcCourses } = require('../utils/discount');
const discount = require('../utils/discount');
const { calcNextPage } = require('../utils/pagination');
const pagination = require('../utils/pagination');
const bestseller = require('../utils/bestseller')
const router = express.Router();

router.get('/detail/:id', async function (req, res, next) {
    const course_id = +req.params.id;
    await courseModel.updateViewNumber(course_id);
    const course = await courseModel.single(course_id);
    const review = await courseModel.allReviewByID(course_id);
    const chapter = await courseModel.allChapterbyID(course_id);
    if (course === null) {
        return res.redirect('/');
    }

    var register = await courseModel.topFiveRegisterInSpec(course["spec"]);
    register = discount.calcCourses(register);
    course["newprice"] = discount.calc(course);
    bestseller.labelBestseller(res.locals.lcBestseller, course);
    //console.log(chapter);
    res.render('vwCourses/detail', {
        course: course,
        spec_name: course["spec_name"],
        register: register,
        review: review,
        full_info: course["full_info"],
        chapter: chapter,
    });
})



router.get('/detail/:id/watch/:chap_id', async function(req, res){
    var check = false;
    const course_id = req.params.id;
    console.log('cacccc'+req.user);
    if(req.user.isStudent) {
        const stuid = req.user.authUser.student_id;
        const temp_id = await courseModel.checkStuCo(stuid, course_id);
        console.log(temp_id);
        if (temp_id != null && temp_id.course_id == course_id) check = true;
        
    }
    else if (req.user.isTeacher){
        const te = req.user.authUser.teacher_id;
        const temp_id = await courseModel.checkTeCo(te, course_id);
        console.log(temp_id);

        if (temp_id != null && temp_id.course_id == course_id) check = true;
    }
    
    if(check == true){

        const chap_id = req.params.chap_id;
        const course = await courseModel.allChapterbyID(course_id);
        const chapter = await courseModel.get_video(course_id, chap_id);
        //console.log(course);
        res.render('vwCourses/watch_video',{
            chapter: chapter,
            course: course,
        });
    }
    else{res.redirect('/courses/detail/'+req.params.id);}

})

router.get('/all', async (req, res) => {
    const page = req.query.page || 1;
    if (page < 1) page = 1;

    const total = await courseModel.countAll();

    const page_numbers = pagination.calcPageNumbers(total, page);
    const offset = pagination.calcOffset(page);
    const next_page = calcNextPage(page, page_numbers);

    var all = await courseModel.pageAll(offset);
    all = discount.calcCourses(all);

    // all.sort(function (a, b) {
    //     return a['newprice'] - b['newprice'];
    // });

    console.log(all);

    res.render('vwCourses/all', {
        course: all,
        page_numbers,
        next_page,
    })
})

router.get('/:type', async (req, res) => {
    const page = req.query.page || 1;
    if (page < 1) page = 1;
    const type = req.params.type;
    var sort = req.query.sort;

    const total = await courseModel.countByTypeName(type);

    const page_numbers = pagination.calcPageNumbers(total, page);
    const offset = pagination.calcOffset(page);
    const next_page = calcNextPage(page, page_numbers);

    var all;
    if (sort === 'lowest price') {
        all = await courseModel.pageByTypeNameSortPrice(type, offset);
    }
    else {
        all = await courseModel.pageByTypeNameSortRating(type, offset);
    }

    var query;
    var isSort;
    if (!sort) {
        query = "";
        isSort = false;
    } else {
        query = 'sort=' + sort + '&';
        sort = sort.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
        isSort = true;
    }

    const allspec = await specModel.allByTypeName(type);
    bestseller.labelBestseller(res.locals.lcBestseller, all);
    res.render('vwCourses/all', {
        course: all,
        isType: true,
        isSort,
        query,
        sort,
        allspec,
        type,
        page_numbers,
        next_page,
        total
    })
})

router.get('/:type/:spec_name', async (req, res) => {
    const page = req.query.page || 1;
    if (page < 1) page = 1;
    const spec = req.params.spec_name;
    const type = req.params.type;
    var sort = req.query.sort;

    const specification = await specModel.singleBySpecName(spec);
    const total = await courseModel.countBySpecName(spec);

    const page_numbers = pagination.calcPageNumbers(total, page);
    const offset = pagination.calcOffset(page);
    const next_page = calcNextPage(page, page_numbers);

    var all;
    if (sort === 'lowest price') {
        all = await courseModel.pageBySpecNameSortPrice(spec, offset);

    }
    else {
        all = await courseModel.pageBySpecNameSortRating(spec, offset);
    }

    var query;
    var isSort;
    if (!sort) {
        query = "";
        isSort = false;
    } else {
        query = 'sort=' + sort + '&';
        sort = sort.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
        isSort = true;
    }

    const allspec = await specModel.allByTypeName(type);
    bestseller.labelBestseller(res.locals.lcBestseller, all);
    res.render('vwCourses/all', {
        isSpec: true,
        spec: specification,
        type,
        isSort,
        sort,
        query,
        allspec,
        course: all,
        page_numbers,
        next_page,
        total
    })
})

router.get('/', async (req, res) => {
    const page = req.query.page || 1;
    if (page < 1) page = 1;
    var sort = req.query.sort;
    const search = req.query.search;

    if (search === "") {
        return res.redirect('/');
    }

    const spec = await specModel.singleBySpecName(search);
    if (spec) {
        return res.redirect('/courses/' + spec['type_name'] + '/' + spec['spec_name']);
    }

    const type = await typeModel.singleByTypeName(search);
    if (type) {
        return res.redirect('/courses/' + type['type_name']);
    }

    const total = await courseModel.countSearchResult(search);

    const page_numbers = pagination.calcPageNumbers(total, page);
    const offset = pagination.calcOffset(page);
    const next_page = calcNextPage(page, page_numbers);

    var all;
    if (sort === 'lowest price') {
        all = await courseModel.pageSearchResultSortPrice(search, offset);
    }
    else if (sort === 'highest rated') {
        all = await courseModel.pageSearchResultSortRating(search, offset);
    } else {
        all = await courseModel.pageSearchResultSortRelevance(search, offset);
    }

    var query;
    var isSort;
    if (!sort) {
        query = '?search=' + search;
        isSort = false;
    } else {
        query = '?search=' + search + '&sort=' + sort + '&';
        sort = sort.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
        isSort = true;
    }

    bestseller.labelBestseller(res.locals.lcBestseller, all);
    res.render('vwCourses/all', {
        search,
        isSearch: true,
        isSort,
        sort,
        query,
        course: all,
        page_numbers,
        next_page,
        total
    })
})

router.post('/remove', async function (req, res) {
    const id = await courseModel.idByCourseName(req.query.course_name);
    await courseModel.delCourseByCourseID(id[0]['course_id']);
})

module.exports = router;
