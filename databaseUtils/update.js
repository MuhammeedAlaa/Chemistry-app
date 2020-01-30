// jshint esversion:6
const connection = require('../config/database');


function updateStudData(req, stud_code, callback) {
    let stmt = `UPDATE student SET fname = ?, lname = ?, password = ?, parent_phone = ?, school = ?, black_point = ?  WHERE student_code = ?`;
    Student = [req.body.fname, req.body.lname, req.body.password, req.body.parent_phone, req.body.school, 0, stud_code];
    connection.query(stmt, Student, (err, results, fields) => {
        if (err) {
            console.error(err.message);
            callback(err, false);
        }
        else
            callback(null, true);
    });
}



function updateAssistData(req) {
    let stmt = `UPDATE assistant SET fname = ?, lname = ?, password = ?, phone = ?, assistant_code = ?  WHERE assistant_code = ?`;
    Student = [req.body.fname, req.body.lname, req.body.password, req.body.phone, req.body.code, req.body.code];
    connection.query(stmt, Student, (err, results) => {
        if (err) {
            console.error(err.message);
        }
        else
        console.error("Updated Successfully");
    });
}

exports.updateStudData = updateStudData;

exports.updateAssistData = updateAssistData;