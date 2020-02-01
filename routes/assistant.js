// jshint esversion:6
const express = require('express');
const router = express.Router();
const { isauth } = require('../utils/auth');
const { isCodeUsed ,insertStudent ,insertLecture, insertAttendance } = require('../databaseUtils/insert');
const { getStudentsInfo, studentInfoCourse, getlecturesnumber } = require('../databaseUtils/info');
const { deleteStudent } = require('../databaseUtils/delete');
const { updateStudantData } = require('../databaseUtils/update');

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

router.get('/BPData', (req, res) => {
    const { role } = isauth(req);
    console.log(role);
    if (role == 'assistant') {
        getStudentsInfo((err, [fullnames, phones, parent_phones, assistIds, studCodes, studpasswords, blackpoints, schools]) => {
            if (err) {
                console.log(err);
                res.redirect('/');
            } else {
                res.json({
                    fullnames: fullnames,
                    phones: phones,
                    parent_phones: parent_phones,
                    assistIds: assistIds,
                    studCodes: studCodes,
                    studpasswords: studpasswords,
                    blackpoints: blackpoints,
                    schools: schools
                });
            }
        });
    } else {
        res.redirect('/');
    }
});
router.post("/EditBPplus", function(req, res) {
    const { role } = isauth(req);
    if (role == 'assistant') {
        req.body.blackpoints += 1;
        var spaceindex = req.body.name.indexOf(" ");
        req.body.fname = req.body.name.substring(0, spaceindex);
        req.body.lname = req.body.name.substring(spaceindex + 1, req.body.name.length);
        updateStudantData(req);
        res.redirect("/");
    } else {
        res.redirect('/');
    }
});
router.post("/EditBPminus", function(req, res) {
    const { role } = isauth(req);
    if (role == 'assistant') {
        req.body.blackpoints -= 1;
        var spaceindex = req.body.name.indexOf(" ");
        req.body.fname = req.body.name.substring(0, spaceindex);
        req.body.lname = req.body.name.substring(spaceindex + 1, req.body.name.length);
        updateStudantData(req);
        res.redirect("/");
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



router.get('/', function(req, res) {
    const { role } = isauth(req);
    if (role == 'assistant') {
        res.render('assistantStudent');
    } else {
        res.redirect('/');
    }
});


router.get('/attendance', function(req, res) {
    const { role } = isauth(req);
    if (role == 'assistant') {
        res.render('bAttendance');
    } else {
        res.redirect('/');
    }
});


router.get('/studentInfo', (req, res) =>{
    const { role } = isauth(req);
    console.log(role);
    if (role == 'assistant') {
        getStudentsInfo((err, [fullnames, phones, parent_phones, assistIds, studCodes, studpasswords, blackpoints, schools]) => {
            if (err) {
                console.log(err);
                res.redirect('/');
            } else {
                res.json({
                    fullnames: fullnames,
                    phones: phones,
                    parent_phones: parent_phones,
                    assistIds: assistIds,
                    studCodes: studCodes,
                    studpasswords: studpasswords,
                    blackpoints: blackpoints,
                    schools: schools
                });
            }
        });
    } else {
        res.redirect('/');
    }
});



router.get('/lecturenumber/:course_id', (req, res) =>{
    const { role } = isauth(req);
    console.log(role);
    if(role == 'assistant'){
        getlecturesnumber(req.params.course_id,(err,[lecture_num, day, hour]) =>{
            if (err) {
                console.log(err);
                res.redirect('/');
            } else {
                res.json({
                    lecture_num : lecture_num, 
                    day: day ,
                     hour: hour
                });
            }
        });
    } else {
        res.redirect('/');
    }
});




router.get('/studentInfoCourse/:code', (req, res) =>{
    const { role } = isauth(req);
    console.log(req.params.code);
    
    if(role == 'assistant'){
        studentInfoCourse(req.params.code, (err,[fullnames, phones, parent_phones, assistIds, studCodes, studpasswords, blackpoints, schools]) =>{
            if (err) {
                console.log(err);
                res.redirect('/');
            } else {
                res.json({
                    fullnames: fullnames,
                    phones: phones,
                    parent_phones: parent_phones,
                    assistIds: assistIds,
                    studCodes: studCodes,
                    studpasswords: studpasswords,
                    blackpoints: blackpoints,
                    schools: schools
                });
            }
        });
    } else {
        res.redirect('/');
    }
});





router.post("/deleteStudent", function(req, res) {
    const { role } = isauth(req);
    if (role == 'assistant') {
        console.log(req.body);
        deleteStudent(req.body.code);
        res.redirect("/");
    } else {
        res.redirect('/');
    }
});



router.post('/AddStudent', function(req, res) {
    const decodedtoken = isauth(req);

    if (decodedtoken.role == 'assistant') {
        var coded = req.body.code;
        isCodeUsed(coded, (err, data) => {
            if (err) { //there is something with the user name
                console.log("Error:", err);
                res.redirect('/');
            } else {
                if (!data) { //returns false or the role of the used code
                    insertStudent(req, decodedtoken.code);
                    res.redirect("/");
                } else {
                    var code = 400;
                    var message = "this user code already in try another one";
                    res.writeHead(code, message, { 'cotent-type': 'text/plain' });
                    res.end(message);
                }
            }
        });
    } else {
        res.redirect('/');
    }
});



router.post('/setattendance', function (req, res) {
    const decodedtoken = isauth(req);
    console.log(req);
    if(decodedtoken.role =='assistant' ){
        for (let i = 0; i < req.body.length; i++) {
            insertAttendance(req.body[i], decodedtoken.code);
            res.redirect("/");   
        }
         
    } else {
        redirect("/");
    }    
                    
    
  });



router.post("/EditStudent", function (req, res) {
    const {role} = isauth(req);
    if (role == 'assistant') {
        var spaceindex = req.body.name.indexOf(" ");
        req.body.fname = req.body.name.substring(0, spaceindex);
        req.body.lname = req.body.name.substring(spaceindex + 1, req.body.name.length);
        updateStudantData(req);
        res.redirect("/");
    } else {
        res.redirect('/');
    }
});



module.exports = router;
module.exports = router;