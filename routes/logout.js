// jshint esversion:8
const express = require('express');
const router = express.Router();
/* GET home page. */
router.get('/', function(req, res) {
    res.clearCookie("token"); //destroy the cookie 
    res.redirect('/');
});
module.exports = router;