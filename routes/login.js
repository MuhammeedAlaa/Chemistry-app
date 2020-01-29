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

router.post('/', function (req, res) {
  if (req.body.code && req.body.password) {
    dbauth.is_assistant(req.body.code, req.body.password, (err, data) =>{
      if (data) { //user is in the database
        dbauth.assistant_name(req.body.code, req.body.password, (err, data) => {
          if (err) { //there is something with the user name
            console.log("Error:", err);
          } else { //user name have no problems and have been fetched
            const token = auth.tokenize_assistant(req.body.code, data);
            res.cookie('token', token);
            res.redirect('/');
          }
        });
      } else { //not in the database(wrong input)
        console.log('not noice');
        res.render('login');
      }
    });
    
  } else //some missing input
    return res.redirect('/login');
});


module.exports = router;