// jshint esversion:8
const express = require('express');
const {getAssistInfo} = require('../databaseUtils/info');
const {insertAssistant} = require('../databaseUtils/insert');
const {updateAssistData} = require('../databaseUtils/update');
const {deleteAssistant} = require('../databaseUtils/delete');
const {getCourseInfo} = require('../databaseUtils/info');
const {insertCourse} = require('../databaseUtils/insert');
const {updateCourseData} = require('../databaseUtils/update');
const {deleteCourse} = require('../databaseUtils/delete');
const {getCenterInfo} = require('../databaseUtils/info');
const {insertCenter} = require('../databaseUtils/insert');
const {updateCenterData} = require('../databaseUtils/update');
const {deleteCenter} = require('../databaseUtils/delete');
const router = express.Router();
router.get('/', function(req, res) {
        res.render('admin');            
});

router.get("/assistant",function (req, res) {
    getAssistInfo((err,[fullnames, phones, count, assistId, assistCode, assistPassword])=>{
        if(err) {
            console.log(err);
        } else {
            res.json({
                fullnames: fullnames,
                phones: phones,
                assistantId: assistId,
                assistantCode: assistCode,
                assistantPassword: assistPassword,
                numberofassistance: count 
            });
        }            
    });
});

router.post("/AddAssistant",function (req, res) {
    console.log(req.body);
    var spaceindex = req.body.name.indexOf(" ");
    req.body.fname = req.body.name.substring(0, spaceindex);
    req.body.lname = req.body.name.substring(spaceindex + 1, req.body.name.length);
    insertAssistant(req);
    res.redirect("/");
});

router.post("/EditAssistant",function (req, res) {
    console.log(req.body);
    var spaceindex = req.body.name.indexOf(" ");
    req.body.fname = req.body.name.substring(0, spaceindex);
    req.body.lname = req.body.name.substring(spaceindex + 1, req.body.name.length);
    updateAssistData(req);
    res.redirect("/");
});



router.post("/delete",function (req, res) {
    console.log(req.body);
    deleteAssistant(req.body.code);
    res.redirect("/");  
});

router.get('/course', function(req, res) {
    res.render('course');            
});


router.get("/Coursedata",function (req, res) {
    getCourseInfo((err,[course_name, course_id])=>{
        if(err) {
            console.log(err);
        } else {
            res.json({
                course_name: course_name,
                course_id: course_id
            });
        }            
    });
});

router.post("/AddCourse",function (req, res) {
    console.log(req.body);
    insertCourse(req.body.code);
    res.redirect("/");
});

router.post("/EditCourse",function (req, res) {
    console.log(req.body);
    updateCourseData(req);
    res.redirect("/");
});



router.post("/DeleteCourse",function (req, res) {
    console.log(req.body);
    deleteCourse(req.body.id);
    res.redirect("/");  
});


router.get('/center', function(req, res) {
    res.render('center');            
});


router.get("/Centerdata",function (req, res) {
    getCenterInfo((err,center_name)=>{
        if(err) {
            console.log(err);
        } else {
            res.json({
                center_name: center_name,
            });
        }            
    });
});

router.post("/AddCenter",function (req, res) {
    console.log(req.body);
    insertCenter(req.body.name);
    res.redirect("/");
});

router.post("/EditCenter",function (req, res) {
    console.log(req.body);
    updateCenterData(req);
    res.redirect("/");
});



router.post("/DeleteCenter",function (req, res) {
    console.log(req.body);
    deleteCenter(req.body.name);
    res.redirect("/");  
});

module.exports = router;