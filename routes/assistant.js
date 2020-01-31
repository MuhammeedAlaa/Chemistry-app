const express = require('express');
const { isauth } = require('../utils/auth');
const { insertLecture } = require('../databaseUtils/insert');
const router = express.Router();

router.get('/', function(req, res) {
    const { role } = isauth(req);
    if (role == 'assistant') {
        res.render('assistantStudent');
    } else {
        res.redirect('/');
    }
});

//------lecture routes
router.get('/lecture', function(req, res) {
    const { role } = isauth(req);
    if (role == 'assistant') {
        res.render('lecture');
    } else {
        res.redirect('/');
    }
});

router.post("/AddLecture", function(req, res) {
    console.log(req.body);
    const { role } = isauth(req);
    if (role == 'assistant') {
        console.log(req.body);
        insertLecture(req.center_name, req.course_id, req.day, req.hour);
        res.redirect("/");
    } else {
        res.redirect('/');
    }
    res.redirect("/");
});

//------Black Points routes
router.get('/blackpoint', function(req, res) {
    const { role } = isauth(req);
    if (role == 'assistant') {
        res.render('blackpoint');
    } else {
        res.redirect('/');
    }
});

//------exam routes
router.get('/Exam', function(req, res) {
    const { role } = isauth(req);
    if (role == 'assistant') {
        res.render('exam');
    } else {
        res.redirect('/');
    }
});

//------exam routes
router.get('/totalAttendance', function(req, res) {
    const { role } = isauth(req);
    if (role == 'assistant') {
        res.render('totalAttendance');
    } else {
        res.redirect('/');
    }
});


module.exports = router;