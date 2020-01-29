// jshint esversion:6
const connection = require('../config/database');

function is_assistant(code, password, callback) {
    let stmt = `select count(*) from Assistant where assistant_code = ? and password = ?`;
    let assistant = [code, password];
    connection.query(stmt, assistant, (err, results, fields) => {
        if (err) {
            console.error(err.message);
            callback(err, false);
        } else {
            if (results[0]['count(*)'] == 1) {
                console.log('noice');
                callback(null, true);
            } else {
                return callback(null, false);
            }
        }
    });
}


function assistant_name(code, password, callback) {
    let stmt = `select fname,lname from Assistant where assistant_code = ? and password = ?`;
    let assistant = [code, password];
    connection.query(stmt, assistant, (err, results) => {
        if (err) {
            console.error(err.message);
            callback(err, null);
        } else {
            if (results[0].fname && results[0].lname) {
                let fname = results[0].fname;
                let lname = results[0].lname;
                let fullname = fname + " " + lname;
                name = fullname;
                console.log('noice' + fullname);
                callback(null, fullname);
            } else {
                console.log(results[0]);
                callback(err, null);
            }
        }
    });
}

function is_student(code, password, callback) {
    let stmt = `select count(*) from Student where student_code = ? and password = ?`;
    let student = [code, password];
    connection.query(stmt, student, (err, results, fields) => {
        if (err) {
            console.error(err.message);
            callback(err, false);
        } else {
            if (results[0]['count(*)'] == 1) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        }
    });
}


function student_name(code, password, callback) {
    let stmt = `select fname,lname from Student where student_code = ? and password = ?`;
    let student = [code, password];
    connection.query(stmt, student, (err, results) => {
        if (err) {
            console.error(err.message);
            callback(err, null);
        } else {
            if (results[0].fname && results[0].lname) {
                let fname = results[0].fname;
                let lname = results[0].lname;
                let fullname = fname + " " + lname;
                name = fullname;
                callback(null, fullname);
            } else {
                console.log(results[0]);
                callback(null, "no");
            }
        }
    });
}





exports.is_assistant = is_assistant;
exports.assistant_name = assistant_name;
exports.is_student = is_student;
exports.student_name = student_name;