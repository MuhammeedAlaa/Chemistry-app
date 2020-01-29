// jshint esversion:6
const connection = require('../config/database');


function isCodeUsed(code, callback) {
    let stmt = `SELECT count(*) FROM Assistant WHERE assistant_code = ?`;
    connection.query(stmt, [code], (err, results, fields) => {
        if (err) {
            callback(err, true);
        } else {
            if (results[0]['count(*)'] == 0) {
                let stmt = `SELECT count(*) FROM Student WHERE student_code = ?`;
                connection.query(stmt, [code], (err, results, fields) => {
                    if (err) {
                        callback(err, true);
                    } else {
                        if (results[0]['count(*)'] == 0) {
                            let stmt = `SELECT count(*) FROM admin WHERE admin_id = ?`;
                            connection.query(stmt, [code], (err, results, fields) => {
                                if (err) {
                                    callback(err, true);
                                } else {
                                    if (results[0]['count(*)'] == 0) {
                                        callback(null, false);
                                    } else
                                        callback(null, true);
                                }
                            });

                        } else
                            callback(null, true);
                    }
                });
            } else
                callback(null, true);
        }
    });
}

function insertAssistant(req){
    let stmt = `INSERT INTO Assistant (password, phone, fname, lname, assistant_code, admin_id)
        VALUES(?,?,?,?,?,?)`;
    let assistant = [req.body.password, req.body.phone, req.body.fname, req.body.lname, req.body.code, 1 /*temporarly hard coded*/ ];
    connection.query(stmt, assistant, (err, results, fields) => {
        if (err) {
            callback(err, null);
        }
        else{  
            if (results[0]['count(*)'] == 1);
            callback(err, null);
    }
    });
}

function insertStudent(req, assistant_code) {
    let stmt = `SELECT assistant_id FROM Assistant WHERE assistant_code = ?`;
    connection.query(stmt, [assistant_code], (err, results, fields) => {
        console.log(results);
        if (err) {
            return console.error(err.message);
        } else {
            let assist_id = results[0].assistant_id;
            let stmt = `INSERT INTO Student (password, phone, student_code, assistant_id)
                VALUES(?,?,?,?)`;
            let Student = [req.body.phone, req.body.phone, req.body.code, assist_id];
            connection.query(stmt, Student, (err, results, fields) => {
                if (err) {
                    return console.error(err.message);
                }
            });
        }
    });


}

exports.insertAssistant = insertAssistant;
exports.insertStudent = insertStudent;
exports.isCodeUsed = isCodeUsed;