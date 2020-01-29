// jshint esversion:6
const express = require('express');
const router = express.Router();
const {
  isauth
} = require('../utils/auth');
const {
  insertAssistant
} = require('../databaseUtils/insert'); //this is to get the attribute insert assistant from the exports object of the module insert


router.get('/', function (req, res) {
  const decoded = isauth(req);
  console.log(decoded);
  if (decoded) {  //if it has a real cookie
    if (decoded.role == 'admin') { //if admin tried to access
      res.render('registerAssist', {
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
    if (decoded.role == 'admin') { //make sure its an admin
      if (req.body.password && req.body.phone && req.body.fname) {
        insertAssistant(req);
        return res.redirect('/');
      } else
        return res.redirect('/registerAssist');
    } else {  //if a stud wanted to post to insert assistant
      return res.redirect('/');
    }
  } else {  //if someone without creditentials
    return res.redirect('/');
  }
});

module.exports = router;