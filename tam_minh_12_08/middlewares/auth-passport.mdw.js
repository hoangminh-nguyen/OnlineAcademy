var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
const userModel = require("../models/account.model");
const studentModel = require("../models/student.model");
const teacherModel = require('../models/teacher.model');
const bcrypt = require("bcryptjs");

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
passport.serializeUser(function (user, done) {
    console.log("serial");
    done(null, user.email);
});

passport.deserializeUser(async function (email, done) {
    const user = await userModel.single(email);
    console.log("deserial");
    lcUser = {
        isStudent: false,
        isTeacher: false,
        isAdmin: false,
        authUser: null,
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

    lcUser.authUser = userInfo;

    done(null, lcUser);
});


const verifyLocalCb = async function (req, username, password, done) {

    const user = await userModel.single(username);
    if (user === null) {
        req.session.message = "Email does not match any account.";
        return done(null, false);
    }
    if (user.activate === 0) {
        req.session.message = "Please verify your email account.";
        return done(null, false);
    }
    if (user.password === null){
        req.session.message = "Please log in with Google or Facebook.";
        return done(null, false);
    }
    const ret = bcrypt.compareSync(password, user.password);
    if (ret === false) {
        req.session.message = "Invalid password.";
        return done(null, false);
    }
    req.session.message = null;
    return done(null, user)
}


const verifyGoogleCb = async function(req, token, tokenSecret, profile, done) {
    console.log(profile);
    var findUser = await userModel.single(profile.emails[0].value);
    if(findUser === null){
        await userModel.createAccountBytype(profile.emails[0].value, 1);
        var newStudent = {
            student_id: null,
            fname: profile.name.familyName,
            lname: profile.name.givenName,
            email: profile.emails[0].value,
            link_ava_student: profile.photos[0].value,
        }
        await studentModel.add(newStudent);
    }
    var user = await userModel.single(profile.emails[0].value);
    return done(null, user);

}

const verifyFacebookCb = async function(req, token, tokenSecret, profile, done) {
    console.log(profile);
    var findUser = await userModel.single(profile.emails[0].value);
    if(findUser === null){
        await userModel.createAccountBytype(profile.emails[0].value, 2);
        var newStudent = {
            student_id: null,
            fname: profile.name.familyName,
            lname: profile.name.givenName,
            email: profile.emails[0].value,
            link_ava_student: profile.photos[0].value,
        }
        await studentModel.add(newStudent);
    }
    var user = await userModel.single(profile.emails[0].value);
    return done(null, user);

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

    passport.use(new GoogleStrategy({
        clientID: "872750390574-lnp54pa3n0c4tiv14a94cm98fkoj7pkv.apps.googleusercontent.com",
        clientSecret: "A_1dLemyIQ04rcNGLA_v6nlw",
        callbackURL: "http://localhost:3000/account/auth/google/callback",
        passReqToCallback: true,
      },
        verifyGoogleCb,
    ));

    passport.use(new FacebookStrategy({
        clientID: "1075361089631626",
        clientSecret: "0a2b16279e5439107cf492d0729b243b",
        callbackURL: "http://localhost:3000/account/auth/facebook/callback",
        profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified', 'picture.type(large)'],
        passReqToCallback: true,
      },
        verifyFacebookCb,
    ));
}
