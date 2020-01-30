// jshint esversion:6
const connection = require('../config/database');
function getStudInfo(studCode,callback){
    let stmt = "SELECT avg(grade) as 'Avg Grade',sum(attended) as 'Total Attendance',black_point as 'Total black points', avg(fullmark) as 'Full mark avg' from exam_grades NATURAL JOIN student NATURAL JOIN attendance NATURAL JOIN exam where student_code = ?";
    connection.query(stmt, studCode, (err,result)=>{
        if(err){
            callback(err,null);
        } else {
            let gradesarv = result[0]['Avg Grade'];
            let attendance = result[0]['Total Attendance'];
            let blackpoints = result[0]['Total black points'];
            let fullmarkavg = result[0]['Full mark avg'];
            callback(null,[gradesarv,attendance,blackpoints,fullmarkavg]);
        }
    });

}
exports.getStudInfo = getStudInfo;