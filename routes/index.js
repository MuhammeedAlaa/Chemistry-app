// jshint esversion:8
const express = require('express');
const router = express.Router();
const jwt = require('jwt-simple');
/* GET home page. */
router.get('/', function(req, res) {
    
    const token = req.cookies.token;
    let secret = 'xxx';
    let decoded = null;
    if(token != null){
        decoded = jwt.decode(token, secret);
    } 
    if(decoded != null){
        console.log(decoded.name);
        res.render('index',{fullnameforhtmlkey: decoded.name});
    } else {
        res.render('index',{fullnameforhtmlkey: ""});
    }
});
module.exports = router;