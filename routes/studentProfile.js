// jshint esversion:8
const express = require('express');
const router = express.Router();
const jwt = require('jwt-simple');
const {isauth} = require('../utils/auth');

/* GET student profile. */
router.get('/:code', function (req, res) {
    const userCode = req.params.code;
    const decoded = isauth(req);
    if (decoded && decoded.code == userCode && decoded.role == "student") {
        /*
        we should have here some queries outputs to get the total attendance, blackpoints,
        and average exams and send it to the following object which is sent to be rendered
        */
        res.render('studentProfile', {
            fullnameforhtmlkey: decoded.name,
            role: decoded.role
        });
    } else {
        res.redirect('/');
    }
});



module.exports = router;