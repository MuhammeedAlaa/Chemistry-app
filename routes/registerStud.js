// jshint esversion:6
const express = require('express');
const router = express.Router();
const {isauth} = require('../utils/auth');
const {isCodeUsed ,insertStudent} = require('../databaseUtils/insert'); //this is to get the attribute insert student from the exports object of the module insert


router.get('/', function (req, res) {
  const decoded = isauth(req);
  console.log(decoded);
  if (decoded) {  //if it has a real cookie
    if (decoded.role == 'assistant' || decoded.role == 'admin') { //if admin or assistant tried to access
      res.render('registerStud', {
        fullnameforhtmlkey: decoded.name,
        role: decoded.role
      });
    } else {  //if a stud tried to access the page to insert assistant
      res.redirect('/');
    }
  } else {  //if someone without creditetials wants to access that link
    res.redirect('/');
  }
});

router.post('/', function (req, res) {
  if(req.body.cancel)
    return res.redirect('/');
  const decoded = isauth(req);
  if (decoded) {  //make sure it has a real cookie
    if (decoded.role == 'assistant' || decoded.role == 'admin') { //make sure it's an admin
      if (req.body.code && req.body.phone) {
        isCodeUsed(req.body.code, (err, data) => {
          if (err) { //there is something with the user name
            console.log("Error:", err);
          } else { 
            if(!data){ //code is not used
            insertStudent(req, decoded.code);
            return res.redirect('/');
            }
            else{
            return res.redirect('/registerStud');
            }
          }
        });
      } else
        return res.redirect('/registerStud');
    } else {  //if a stud wanted to post to insert assistant
      return res.redirect('/');
    }
  } else {  //if someone without creditentials
    return res.redirect('/');
  }
});

module.exports = router;