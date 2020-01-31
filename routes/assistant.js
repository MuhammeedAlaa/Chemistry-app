// jshint esversion:6
const express = require('express');
const { isauth } = require('../utils/auth');
const { isCodeUsed ,insertStudent ,insertLecture } = require('../databaseUtils/insert');
const { getStudentsInfo } = require('../databaseUtils/info');
const { deleteStudent } = require('../databaseUtils/delete');
const { updateStudantData } = require('../databaseUtils/update');
const router = express.Router();

router.get('/', function(req, res) {
    const { role } = isauth(req);
    if (role == 'assistant') {
        res.render('assistantStudent');
    } else {
        res.redirect('/');
    }
});


router.get('/studentInfo', (req, res) =>{
    const { role } = isauth(req);
    console.log(role);
    if(role == 'assistant'){
        getStudentsInfo((err,[fullnames, phones, parent_phones, assistIds, studCodes, studpasswords, blackpoints, schools]) =>{
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





router.post("/deleteStudent", function (req, res) {
    const {role} = isauth(req);
    if (role == 'assistant') {
        console.log(req.body);
        deleteStudent(req.body.code);
        res.redirect("/");
    } else {
        res.redirect('/');
    }
});



router.post('/AddStudent', function (req, res) {
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
                    res.writeHead(code, message,{'cotent-type' : 'text/plain'});
                    res.end(message);
                }
            }
        });
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