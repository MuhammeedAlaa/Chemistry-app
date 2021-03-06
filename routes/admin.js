// jshint esversion:8
const express = require('express');
const _ = require('lodash');
const {getAssistInfo, getCourseInfo, getCenterInfo, getlectureInfo} = require('../databaseUtils/info');
const {insertAssistant, insertCenter, insertCourse, isCodeUsed, insertNewLecture, insertNewExam} = require('../databaseUtils/insert');
const {updateAssistData, updateCenterData, updateCourseData, updateLectureData} = require('../databaseUtils/update');
const {deleteAssistant, deleteCourse, deleteCenter, deleteLecData} = require('../databaseUtils/delete');
const {isauth} = require('../utils/auth');
const router = express.Router();
router.get('/', function (req, res) {
    const {role} = isauth(req);
    if (role == 'admin') {
        res.render('admin');
    } else {
        res.redirect('/');
    }
});

router.get("/assistant", function (req, res) {
    const {role} = isauth(req);
    if (role == 'admin') {
        getAssistInfo((err, [fullnames, phones, count, assistId, assistCode, assistPassword]) => {
            if (err) {
                console.log(err);
                res.redirect('/');
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
    } else {
        res.redirect('/');
    }
});

router.post("/AddAssistant", function (req, res) {
    const {
        role
    } = isauth(req);
    if (role == 'admin') {
        isCodeUsed(req.body.code, (err, data) => {
            if (err) { //there is something with the user name
                console.log("Error:", err);
                res.redirect('/');
            } else {
                if (!data) { //returns false or the role of the used code
                    var spaceindex = req.body.name.indexOf(" ");
                    req.body.fname = req.body.name.substring(0, spaceindex);
                    req.body.lname = req.body.name.substring(spaceindex + 1, req.body.name.length);
                    insertAssistant(req);
                    res.redirect("/");
                } else {
                    var code = 400;
                    var message = "this user code already in try another one";
                    res.writeHead(code, message,{'cotent-type' : 'text/plain'});
                    res.end(message);
                }
            }
        });
    } else {
        res.redirect('/');
    }
});

router.post("/EditAssistant", function (req, res) {
    const {role} = isauth(req);
    if (role == 'admin') {
        console.log(req.body);
        var spaceindex = req.body.name.indexOf(" ");
        req.body.fname = req.body.name.substring(0, spaceindex);
        req.body.lname = req.body.name.substring(spaceindex + 1, req.body.name.length);
        updateAssistData(req);
        res.redirect("/");
    } else {
        res.redirect('/');
    }
});



router.post("/delete", function (req, res) {
    const {role} = isauth(req);
    if (role == 'admin') {
        console.log(req.body);
        deleteAssistant(req.body.code);
        res.redirect("/");
    } else {
        res.redirect('/');
    }
});

router.get('/course', function (req, res) {
    const {role} = isauth(req);
    if (role == 'admin') {
        res.render('course');
    }
    else{
        res.redirect('/');
    }
});


router.get("/Coursedata", function (req, res) {
    const {role} = isauth(req);
    if (role == 'admin' || role == 'assistant') {
        getCourseInfo((err, [course_name, course_id]) => {
            if (err) {
                console.log(err);
                res.redirect('/');
            } else {
                res.json({
                    course_name: course_name,
                    course_id: course_id
                });
            }
        });
    } else {
        res.redirect('/');
    }
});

router.post("/AddCourse", function (req, res) {
    const {role} = isauth(req);
    if (role == 'admin') {
        let oldC = req.body.old;
        let newC = req.body.new;
        let dontInsert = false;
        for(var course_index = 0; course_index < oldC.length; course_index++ ){
            if(_.toLower(newC.name) == _.toLower(oldC[course_index].name)){
                var code = 400;
                var message = "The Course already Exist";
                res.writeHead(code, message,{'cotent-type' : 'text/plain'});
                res.end(message);
                dontInsert = true;
            }
        } 
        if(!dontInsert)       
        insertCourse(newC.name);
        res.redirect("/");
    }
    else{
        res.redirect('/');
    }
});

router.post("/EditCourse", function (req, res) {
    const {role} = isauth(req);
    if (role == 'admin') {
        let oldCS = req.body.courses;
        let newNameC = req.body.newname;
        let dontInsert = false;
        for(var course_index = 0; course_index < oldCS.length; course_index++ ){
            if(_.toLower(newNameC) == _.toLower(oldCS[course_index].name)){
                var code = 400;
                var message = "The Course already Exist";
                res.writeHead(code, message,{'cotent-type' : 'text/plain'});
                res.end(message);
                dontInsert = true;
            }
        } 
        if(!dontInsert)       
        updateCourseData(req);
        res.redirect("/");
    }
    else{
        res.redirect('/');
    }
});



router.post("/DeleteCourse", function (req, res) {
    const {role} = isauth(req);
    if (role == 'admin') {
        deleteCourse(req.body.name);
        res.redirect("/");
    }
    else{
        res.redirect('/');
    }
});


router.get('/center', function (req, res) {
    const {role} = isauth(req);
    if (role == 'admin') {
        res.render('center');
    } else {
        res.redirect('/');
    }
});


router.get("/Centerdata", function (req, res) {
    const {role} = isauth(req);
    if (role == 'admin' || role =='assistant') {
        getCenterInfo((err, center_name) => {
            if (err) {
                console.log(err);
                res.redirect('/');
            } else {
                res.json({
                    center_name: center_name,
                });
            }
        });
    } else {
        res.redirect('/');
    }
});

router.post("/AddCenter", function (req, res) {
    const {role} = isauth(req);
    if (role == 'admin') {
        let oldCS = req.body.old;
        let newNameC = req.body.name;
        let dontInsert = false;
        for(var center_index = 0; center_index < oldCS.length; center_index++ ){
            if(_.toLower(newNameC) == _.toLower(oldCS[center_index].name)){
                var code = 400;
                var message = "The Center already Exist";
                res.writeHead(code, message,{'cotent-type' : 'text/plain'});
                res.end(message);
                dontInsert = true;
            }
        } 
        if(!dontInsert)       
        insertCenter(newNameC);
        res.redirect("/");
    } else {
        res.redirect('/');
    }
});


router.post("/EditCenter", function (req, res) {
    const {role} = isauth(req);
    if (role == 'admin') {
        let oldCS = req.body.old;
        let newNameC = req.body.NewCentername;
        let dontInsert = false;
        for(var center_index = 0; center_index < oldCS.length; center_index++ ){
            if(_.toLower(newNameC) == _.toLower(oldCS[center_index].name)){
                var code = 400;
                var message = "The Center already Exist";
                res.writeHead(code, message,{'cotent-type' : 'text/plain'});
                res.end(message);
                dontInsert = true;
            }
        } 
        if(!dontInsert)       
        updateCenterData(req);
        res.redirect("/");
    } else {
        res.redirect('/');
    }
});



router.post("/DeleteCenter", function (req, res) {
    const {role} = isauth(req);
    if (role == 'admin') {
        console.log(req.body);
        deleteCenter(req.body.name);
        res.redirect("/");
    } else {
        res.redirect('/');
    }
});





router.get('/lecture', function (req, res) {
    const {role} = isauth(req);
    if (role == 'admin') {
        res.render('lecture');
    }
    else{
        res.redirect('/');
    }
});

router.get("/lectureData", function (req, res) {
    const {role} = isauth(req);
    if (role == 'admin') {
        getlectureInfo((err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.json(data);
            }
        });
    } else {
        res.redirect('/');
    }
});

router.post('/addlecture', function (req, res) {
    console.log(req.body);
    const {role} = isauth(req);
    if (role == 'admin') {
        insertNewLecture(req.body.center_name, req.body.course_id, req.body.day, req.body.hour);
        res.redirect("/");
    }
    else{
        res.redirect('/');
    }
});


router.post('/EditLecture', function (req, res) {
    console.log(req.body);
    const {role} = isauth(req);
    if (role == 'admin') {
        updateLectureData(req);
        res.redirect("/");
    }
    else{
        res.redirect('/');
    }
});

router.post('/DeleteLecture', function (req, res) {
    const {role} = isauth(req);
    if (role == 'admin') {
        deleteLecData(req);
        res.redirect("/");
    }
    else{
        res.redirect('/');
    }
});




router.get('/exam', function(req, res) {
    const { role } = isauth(req);
    if (role == 'admin') {
        res.render('exam');
    } else {
        res.redirect('/');
    }
});


router.post('/insertexam', function(req, res) {
    const { role } = isauth(req);
    console.log(req.body + "   " + code);
    if (role == 'admin') {
        insertNewExam(req);
        res.redirect('/');
    } else {
        res.redirect('/');
    }
});

module.exports = router;