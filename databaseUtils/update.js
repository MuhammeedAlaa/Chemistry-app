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


function updateStudantData(req) {
    let stmt = `UPDATE student SET fname = ?, lname = ?, password = ?, parent_phone = ?, school = ?, black_point = ?, phone = ?  WHERE student_code = ?`;

    
    Student = [req.body.fname, req.body.lname, req.body.password, req.body.parent_phone, req.body.school, req.body.blackpoints, req.body.phone, req.body.code];
    console.log(Student);
    connection.query(stmt, Student, (err, results) => {
        if (err) {
            console.error(err.message);
        }
        else
        {
            console.log("Updated Successfully");
        }
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
        console.log("Updated Successfully");
    });
}


function updateCourseData(req) {
    let stmt = `UPDATE course SET course_name =? WHERE course_name =?`;
    connection.query(stmt, [req.body.newname, req.body.oldcourse.name], (err, results) => {
        if (err) {
            console.error(err.message);
        }
        else{
            console.log("Updated Successfully");
            console.log(req.body.oldcourse.name + "  " + req.body.newname);
        }
    });
}


function updateCenterData(req) {
    let stmt = `UPDATE center SET center_name = ? WHERE center_name = ?`;
    connection.query(stmt, [req.body.NewCentername, req.body.oldCentername], (err, results) => {
        if (err) {
            console.error(err.message);
        }
        else
        console.log("Updated Successfully");
    });
}

exports.updateStudData = updateStudData;
exports.updateStudantData = updateStudantData;
exports.updateCourseData = updateCourseData;

exports.updateAssistData = updateAssistData;
exports.updateCenterData = updateCenterData;