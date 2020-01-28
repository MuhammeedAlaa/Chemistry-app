// jshint esversion:6
const express = require('express');
const router = express.Router();
const connection = require('../config/database');
  router.get('/', function(req, res){
    res.render('registerAssist');
  });

  router.post('/', function(req, res){
    if(req.body.password && req.body.phone && req.body.fname)
    {
        let stmt = `INSERT INTO Assistant (password, phone, fname, lname, assistant_code, admin_id)
        VALUES(?,?,?,?,?,?)`;
        let registerant = [req.body.password , req.body.phone, req.body.fname,req.body.lname, req.body.code , 1/*temporarly hard coded*/ ];
        connection.query(stmt, registerant, (err, results, fields) => {
        if (err) {
            return console.error(err.message);
        }
        });
        return res.redirect('/');
      
    }
    else
        return res.redirect('/registerAssist');
  });

  module.exports = router;