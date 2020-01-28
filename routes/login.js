// jshint esversion:8
const auth = require('../utils/auth');
const dbauth = require('../databaseUtils/auth');
const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  if (auth.isauth(req)) {
    res.redirect('/');
  } else {
    res.clearCookie("token"); //destroy the cookie
    return res.render('login');
  }
});

router.post('/',  function (req, res) {
  if (req.body.code && req.body.password) {
    const is_assist =  dbauth.is_assistant(req.body.code, req.body.password);
    console.log(is_assist);
    if (is_assist) { //user is in the database
      const token = auth.tokenize_assistant(req.body.code);
      res.cookie('token', token);
      res.redirect('/');
    } else { //not in the database(wrong input)
      console.log('not noice');
      res.render('login');
    }
  } else //some missing input
    return res.redirect('/login');
});


module.exports = router;