// jshint esversion:6
const express = require('express');
const router = express.Router();
const {
  isauth
} = require('../utils/auth');
const {
  updateStudData
} = require('../databaseUtils/update');

/* GET student info page. */
router.get('/', function(req, res) {
    res.render('firstlog');
});

router.post('/', function(req, res){
    const decoded = isauth(req);
    if (decoded) { //make sure it has a real cookie
        if (decoded.role == 'student' && decoded.name == "no") { //make sure its a stud
            if (req.body.fname && req.body.lname && req.body.parent_phone && req.body.school && req.body.password) {
                updateStudData(req, decoded.code, (err, data)=>{//data false  = insertion failed
                    if(!data)
                        res.redirect("/firstlog");
                    else
                        res.clearCookie("token"); //destroy the cookie
                        res.redirect('/login');
                });
            } else
                return res.redirect('/firstlog');
        }
        else
            return res.redirect('/');
    } else //don't have a cookie
        return res.redirect('/');
});
module.exports = router;