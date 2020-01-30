// jshint esversion:8
const express = require('express');
const {insertLecture} = require('../databaseUtils/insert');
const router = express.Router();
// router.get('/', function(req, res) {
//         res.render('');            
// });


router.post("/AddLecture",function (req, res) {
    console.log(req.body);
    insertLecture(req.center_name, req.course_id, req.day, req.hour);
    res.redirect("/");
});

module.exports = router;