// jshint esversion:6
const connection = require('../config/database');
function getStudInfo(studCode,callback){
    let stmt = "SELECT avg(grade) as 'Avg Grade',sum(attended) as 'Total Attendance',black_point as'Total black points' from exam_grades NATURAL JOIN student NATURAL JOIN attendance where student_code = ?";
    connection.query(stmt, studCode, (err,result)=>{
        if(err){
            callback(err,null);
        } else {
            let gradesarv = result[0]['Avg Grade'];
            let attendance = result[0]['Total Attendance'];
            let blackpoints = result[0]['Total black points'];
            callback(null,[gradesarv,attendance,blackpoints]);
        }
    });

}
exports.getStudInfo = getStudInfo;