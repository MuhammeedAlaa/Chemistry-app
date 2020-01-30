// jshint esversion:8
const express = require('express');
const router = express.Router();
const jwt = require('jwt-simple');
const {isauth} = require('../utils/auth');
const {getStudInfo} = require('../databaseUtils/studentinfo');

/* GET student profile. */
router.get('/:code', function (req, res) {
    const userCode = req.params.code;
    const decoded = isauth(req);
    if (decoded && decoded.code == userCode && decoded.role == "student") {
        /*
        we should have here some queries outputs to get the total attendance, blackpoints,
        and average exams and send it to the following object which is sent to be rendered
        */
        getStudInfo(userCode, (err,[gradesarv,attendance,blackpoints]) =>{
            if(err){
                console.log(err);
                res.redirect("/");
            } else {
                res.render('studentProfile', {
                    fullnameforhtmlkey: decoded.name,
                    role: decoded.role,
                    blackpointsforhtml: blackpoints,
                    avgexamsforhtml: attendance,
                    attendanceforhtml: gradesarv
                });
            }
       }); 
      
    } else {
        res.redirect('/');
    }
});



module.exports = router;