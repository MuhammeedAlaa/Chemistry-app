// jshint esversion:8
const express = require('express');
const router = express.Router();
const jwt = require('jwt-simple');
const {isauth} = require('../utils/auth');
const {getStudInfo} = require('../databaseUtils/info');

/* GET student profile. */
router.get('/:code', function (req, res) {
    const userCode = req.params.code;
    const decoded = isauth(req);
    if (decoded && decoded.code == userCode && decoded.role == "student") {
        getStudInfo(userCode, (err,[gradesarv,attendance,blackpoints,fullavg]) =>{
            if(err){
                console.log(err);
                res.redirect("/");
            } else {
                res.render('studentProfile', {
                    fullnameforhtmlkey: decoded.name,
                    role: decoded.role,
                    blackpointsforhtml: blackpoints,
                    avgexamsforhtml: gradesarv,
                    attendanceforhtml: attendance,
                    fullmarkavgforhtml: fullavg
                });
            }
       }); 
      
    } else {
        res.redirect('/');
    }
});



module.exports = router;