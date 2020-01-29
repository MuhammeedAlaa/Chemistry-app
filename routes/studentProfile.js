// jshint esversion:8
const express = require('express');
const router = express.Router();
const jwt = require('jwt-simple');
const {isauth} = require('../utils/auth');

/* GET student profile. */
router.get('/', function (req, res) {

    const decoded = isauth(req);
    if (decoded) {
        res.render('studentProfile', {
            fullnameforhtmlkey: decoded.name,
            role: decoded.role
        });
    } else {
        res.clearCookie("token"); //destroy the cookie
        res.render('index', {
            fullnameforhtmlkey: "",
            role : ""
        });
    }
});



module.exports = router;