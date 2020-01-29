// jshint esversion:8
const auth = require('../utils/auth');
const dbauth = require('../databaseUtils/auth');
const {
  isCodeUsed
} = require('../databaseUtils/insert');
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

router.post('/', function (req, res) {
  if (req.body.code && req.body.password) {
    isCodeUsed(req.body.code, (err, data) => {
      if (data == 'admin')
        dbauth.is_admin(req.body.code, req.body.password, (err, data) => {
          if (data) { //user is in the database
            const token = auth.tokenize('admin', req.body.code, "Micheal Labib");
            res.cookie('token', token);
            res.redirect('/');
          } else //wrong password
            res.redirect('/login');
        });
      else if (data == 'assistant')
        dbauth.assistant_name(req.body.code, req.body.password, (err, data) => {
          if (data) { //user is in the database
            const token = auth.tokenize('assistant', req.body.code, data);
            res.cookie('token', token);
            res.redirect('/');
          } else //wrong password
            res.redirect('/login');
        });
      else if (data == 'student')
        dbauth.student_name(req.body.code, req.body.password, (err, data) => {
          if (data) { //user is in the database
            const token = auth.tokenize('student', req.body.code, data);
            res.cookie('token', token);
            res.redirect('/');
          } else //wrong password
            res.redirect('/login');
        });
      else //data is false (no stored code matched)
        res.redirect('/login');
    });

  } else //some missing input
    return res.redirect('/login');
});


module.exports = router;