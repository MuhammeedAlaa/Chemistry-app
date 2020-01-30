// jshint esversion:8
const express = require('express');
const {getAssistInfo} = require('../databaseUtils/info');
const {insertAssistant} = require('../databaseUtils/insert');
const {updateAssistData} = require('../databaseUtils/update');
const {deleteAssistant} = require('../databaseUtils/delete');
const router = express.Router();
router.get('/', function(req, res) {
        res.render('admin');            
});

router.get("/assistant",function (req, res) {
    getAssistInfo((err,[fullnames, phones, count, assistId, assistCode, assistPassword])=>{
        if(err) {
            console.log(err);
        } else {
            res.json({
                fullnames: fullnames,
                phones: phones,
                assistantId: assistId,
                assistantCode: assistCode,
                assistantPassword: assistPassword,
                numberofassistance: count 
            });
        }            
    });
});

router.post("/AddAssistant",function (req, res) {
    console.log(req.body);
    var spaceindex = req.body.name.indexOf(" ");
    req.body.fname = req.body.name.substring(0, spaceindex);
    req.body.lname = req.body.name.substring(spaceindex + 1, req.body.name.length);
    insertAssistant(req);
    res.redirect("/");
});

router.post("/EditAssistant",function (req, res) {
    console.log(req.body);
    var spaceindex = req.body.name.indexOf(" ");
    req.body.fname = req.body.name.substring(0, spaceindex);
    req.body.lname = req.body.name.substring(spaceindex + 1, req.body.name.length);
    updateAssistData(req);
    res.redirect("/");
});



router.post("/delete",function (req, res) {
    console.log(req.body);
    deleteAssistant(req.body.code);
    res.redirect("/");  
});

module.exports = router;