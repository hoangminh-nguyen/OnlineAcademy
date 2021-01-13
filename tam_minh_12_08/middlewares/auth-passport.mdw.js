var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
const userModel = require("../models/account.model");
const studentModel = require("../models/student.model");
const teacherModel = require('../models/teacher.model');
const bcrypt = require("bcryptjs");



passport.serializeUser(function (user, done) {
    done(null, user.email);
});

passport.deserializeUser(async function (email, done) {
    const user = await userModel.single(email);

    lcUser = {
        isStudent: false,
        isTeacher: false,
        isAdmin: false,
        userInfo: null,
    }

    var userInfo;
    if (user.mode === 2) {
        lcUser.isStudent = true;
        userInfo = await studentModel.studentInfo(user.email);
    } else if (user.mode === 1) {
        lcUser.isTeacher = true;
        userInfo = await teacherModel.teacherInfo(user.email);
    } else if (user.mode === 0) {
        lcUser.isAdmin = true;
        userInfo = user;
    }

    lcUser.userInfo = userInfo;

    done(null, lcUser);
});


const verifyLocalCb = async function (req, username, password, done) {

    const user = await userModel.single(username);

    if (user === null) {
        req.session.message = "Email does not match any account.";
        return done(null, false);
    }

    const ret = bcrypt.compareSync(password, user.password);
    if (ret === false) {
        req.session.message = "Invalid password.";
        return done(null, false);
    }

    return done(null, user)
}

module.exports.passportSetup = (app) => {


app.use(passport.initialize());
app.use(passport.session());
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        verifyLocalCb,
    ));
}
