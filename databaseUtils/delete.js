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
function deleteStudent(assist_code) {
    let stmt = `DELETE FROM STUDENT WHERE student_code = ?`;
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


function deleteLecData(req) {
    let stmt = `DELETE FROM lec_timetable WHERE course_id = ? AND center_name = ? AND day = ? AND hour = ?`;
    const r = req.body;
    const lecture = [r.course_id, r.center_name, r.day, r.hour];
    console.log(lecture);
    connection.query(stmt, lecture, (err, results) => {
        if (err) {
            console.error(err.message);
        }
        else
        {
            console.error("Deleted Successfully");
        }
});
}

function deleteLecInstanceData(req) {
    let stmt = `DELETE FROM lecture WHERE lecture_num = ? AND course_id = ? AND center_name = ? AND day = ? AND hour = ?`;
    const r = req.body;
    const lecture = [r.lecture_num, r.course_id, r.center_name, r.day, r.hour];
    connection.query(stmt, lecture, (err, results) => {
        if (err) {
            console.error(err.message);
        }
        else
        {
            console.error("Deleted LECTURE INSTANCE Successfully");
            let stmt = `DELETE FROM exam WHERE exam_num = ? AND lecture_num = ? AND course_id = ? AND center_name = ?`;
            const r = req.body;
            const exam = [r.lecture_num,r.lecture_num, r.course_id, r.center_name];
            connection.query(stmt, exam, (err, results) => {
                if (err) {
                    console.error(err.message);
                }else{
                    console.error("Deleted EXAM Successfully");
                }
            });
            
        }
});
}


exports.deleteLecData = deleteLecData;
exports.deleteAssistant = deleteAssistant;
exports.deleteCourse = deleteCourse;
exports.deleteCenter = deleteCenter;
exports.deleteStudent = deleteStudent;
exports.deleteLecInstanceData = deleteLecInstanceData;
