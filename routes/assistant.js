// jshint esversion:6
const express = require('express');
const router = express.Router();
const { isauth } = require('../utils/auth');
const { isCodeUsed, insertStudent, insertLecture, insertAttendance, insertNewExamScore, insertNewLectureinstance } = require('../databaseUtils/insert');
const { getStudentsInfo, studentInfoCourse, getlecturesnumber, getExam, getlectureInstanceInfo, getlectureInfo } = require('../databaseUtils/info');
const { deleteStudent, deleteLecInstanceData } = require('../databaseUtils/delete');
const { updateStudantData, updateLectureInstanceData } = require('../databaseUtils/update');

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
        res.render('lectureinstance');
<<<<<<< HEAD
    } else {
=======
        } else {
>>>>>>> noerrorversion
        res.redirect('/');
    }
});

<<<<<<< HEAD
router.get("/baseLectureData", function (req, res) {
    const {role} = isauth(req);
    if (role == 'assistant') {
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

router.get("/lectureData", function (req, res) {
    const {role} = isauth(req);
    if (role == 'assistant') {
        getlectureInstanceInfo((err, data) => {
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
    const {role} = isauth(req);
    if (role == 'assistant') {
        insertNewLectureinstance(req,(err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.json(data);
                res.status(200).end();
            }
        });
    }
    else{
        res.redirect('/');
    }
});


router.post('/EditLecture', function (req, res) {
    console.log(req.body);
    const {role} = isauth(req);
    if (role == 'assistant') {
        console.log(2000);
        updateLectureInstanceData(req);
        res.redirect("/");
    }
    else{
        res.redirect('/');
    }
});



router.post('/DeleteLecture', function (req, res) {
    const {role} = isauth(req);
    if (role == 'assistant') {
        deleteLecInstanceData(req);
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


=======
>>>>>>> noerrorversion
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
    if (role == 'assistant'  || role == 'admin') {
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


router.get('/studentInfo', (req, res) => {
    const { role } = isauth(req);
    console.log(role);
    if (role == 'assistant') {
        getStudentsInfo((err, [fullnames, phones, parent_phones, assistIds, studCodes, studpasswords, blackpoints, schools, course_id, course_name]) => {
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
                    schools: schools,
                    course_id: course_id,
                    course_name: course_name
                });
            }
        });
    } else {
        res.redirect('/');
    }
});



router.get('/lecturenumber/:course_id/:center_name', (req, res) => {
    const { role } = isauth(req);
    console.log(role);
    if (role == 'assistant' || role == 'admin') {
        console.log(req.params.course_id + "    " + req.params.center_name);
        
        getlecturesnumber(req.params.course_id, req.params.center_name, (err, [lecture_num, day, hour]) => {
            if (err) {
                console.log(err);
                res.redirect('/');
            } else {
                res.json({
                    lecture_num: lecture_num,
                    day: day,
                    hour: hour
                });
            }
        });
    } else {
        res.redirect('/');
    }
});




router.get('/studentInfoCourse/:code', (req, res) => {
    const { role } = isauth(req);
    console.log(req.params.code);
    if (role == 'assistant') {
        studentInfoCourse(req.params.code, (err, [fullnames, phones, parent_phones, assistIds, studCodes, studpasswords, blackpoints, schools]) => {
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



router.post('/setattendance', function(req, res) {
    const decodedtoken = isauth(req);
    if(decodedtoken.role =='assistant' ){
        for (let i = 0; i < req.body.length; i++) {
            insertAttendance(req.body[i], decodedtoken.code);
        }
    } else {
        res.redirect("/");
    }
    res.redirect("/")


});



router.post("/EditStudent", function(req, res) {
    const { role } = isauth(req);
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



router.get("/studscore", function(req, res) {
    const { role } = isauth(req);
    if (role == 'assistant') {
        console.log(req.body);
        res.render("examscore");
    } else {
        res.redirect('/');
    }
});


router.post("/insertScore", function(req, res) {
    const { role } = isauth(req);
    const { code } = isauth(req);
    if (role == 'assistant') {
        insertNewExamScore(req,code);
        res.redirect('/');
    } else {
        res.redirect('/');
    }
});

router.get("/examnum/:co/:lec/:cen", function(req, res) {
    const { role } = isauth(req);
    if (role == 'assistant') {
        getExam(req,(err,num)=>{
            if(err){
                console.log(err);
                res.redirect("/");
            } else {
                console.log("Success");
                res.json({
                    num: num
                });
            }
        });
    } else {
        res.redirect('/');
    }
});



router.get('/studentInfoCourse/:code', (req, res) => {
    const { role } = isauth(req);
    console.log(req.params.code);
    if (role == 'assistant') {
        studentInfoCourse(req.params.code, (err, [fullnames, phones, parent_phones, assistIds, studCodes, studpasswords, blackpoints, schools]) => {
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









router.get("/baseLectureData", function (req, res) {
    const {role} = isauth(req);
    if (role == 'assistant') {
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

router.get("/lectureData", function (req, res) {
    const {role} = isauth(req);
    if (role == 'assistant') {
        getlectureInstanceInfo((err, data) => {
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
    const {role} = isauth(req);
    if (role == 'assistant') {        
        insertNewLectureinstance(req,(err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.json(data);
                res.status(200).end();
            }
        });
    }
    else{
        res.redirect('/');
    }
});


router.post('/EditLecture', function (req, res) {
    console.log(req.body);
    const { role } = isauth(req);
    if (role == 'assistant') {
        updateLectureInstanceData(req);
        res.redirect("/");
    }
    else{
        res.redirect('/');
    }
});




router.post('/DeleteLecture', function (req, res) {
    const {role} = isauth(req);
    if (role == 'assistant') {
        deleteLecInstanceData(req);
        res.redirect("/");
    }
    else{
        res.redirect('/');
    }
});




module.exports = router;
module.exports = router;