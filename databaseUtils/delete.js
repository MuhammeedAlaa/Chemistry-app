// jshint esversion:6
const connection = require('../config/database');


function deleteAssistant(assist_code) {
    let stmt = `DELETE FROM ASSISTANT WHERE assistant_code = ?`;
    connection.query(stmt, assist_code, (err, results) => {
        if (err) {
            console.error(err.message);
        }
        else
        console.error("Deleted Successfully");
    });
}


function deleteCourse(course_name) {
        let stmt = `DELETE FROM COURSE WHERE course_name = ?`;
        connection.query(stmt, course_name, (err, results) => {
            if (err) {
                console.error(err.message);
            }
            else
            {
                console.error("Deleted Successfully");
            }
    });
}


function deleteCenter(Center_name) {
    let stmt = `DELETE FROM CENTER WHERE Center_name = ?`;
    connection.query(stmt, Center_name, (err, results) => {
        if (err) {
            console.error(err.message);
        }
        else
        {
            console.error("Deleted Successfully");
        }
    });
}


exports.deleteAssistant = deleteAssistant;
exports.deleteCourse = deleteCourse;
exports.deleteCenter = deleteCenter;
