// jshint esversion:6
const connection = require('../config/database');

function insertAssistant(req) {
    let stmt = `INSERT INTO Assistant (password, phone, fname, lname, assistant_code, admin_id)
        VALUES(?,?,?,?,?,?)`;
    let assistant = [req.body.password, req.body.phone, req.body.fname, req.body.lname, req.body.code, 1 /*temporarly hard coded*/ ];
    connection.query(stmt, assistant, (err, results, fields) => {
        if (err) {
            return console.error(err.message);
        }
    });
}


exports.insertAssistant = insertAssistant;