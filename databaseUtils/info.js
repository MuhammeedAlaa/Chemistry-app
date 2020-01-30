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

function getAssistInfo(callback){
    let stmt = "SELECT * FROM ASSISTANT";
    connection.query(stmt, (err,result) =>{
        if(err){
            callback(err,null);
        } else {
            let fullnames = [];
            let phones = [];
            let count = result.length;
            let assistId = [];
            let assistCode = [];
            let assistpasswords = [];
            result.forEach((assistant)=>{
                fullnames.push(assistant.fname + " " + assistant.lname);
                phones.push(assistant.phone);
                assistId.push(assistant.assistant_id);
                assistCode.push(assistant.assistant_code);
                assistpasswords.push(assistant.password);
                console.log(assistant.fname + " " + assistant.lname + " " + assistant.assistant_id + " " + assistant.assistant_code + " " + assistant.password);
            });
            callback(null, [fullnames, phones, count, assistId, assistCode, assistpasswords]);
        }
    });
}




exports.getAssistInfo = getAssistInfo;
exports.getStudInfo = getStudInfo;