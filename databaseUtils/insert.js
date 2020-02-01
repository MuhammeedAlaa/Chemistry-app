// jshint esversion:6
const connection = require('../config/database');


function isCodeUsed(code, callback) {
    let stmt = `SELECT count(*) FROM Assistant WHERE assistant_code = ?`;
    connection.query(stmt, [code], (err, results, fields) => {
        if (err) {
            callback(err, false);
        } else {
            if (results[0]['count(*)'] == 0) {
                let stmt = `SELECT count(*) FROM Student WHERE student_code = ?`;
                connection.query(stmt, [code], (err, results, fields) => {
                    if (err) {
                        callback(err, false);
                    } else {
                        if (results[0]['count(*)'] == 0) {
                            let stmt = `SELECT count(*) FROM admin WHERE admin_id = ?`;
                            connection.query(stmt, [code], (err, results, fields) => {
                                if (err) {
                                    callback(err, false);
                                } else {
                                    if (results[0]['count(*)'] == 0) {
                                        callback(null, false);
                                    } else
                                        callback(null, 'admin');
                                }
                            });

                        } else
                            callback(null, 'student');
                    }
                });
            } else
                callback(null, 'assistant');
        }
    });
}

function insertAssistant(req){
    let stmt = `INSERT INTO Assistant (password, phone, fname, lname, assistant_code, admin_id)
        VALUES(?,?,?,?,?,?)`;
    let assistant = [req.body.password, req.body.phone, req.body.fname, req.body.lname, req.body.code, 1 /*temporarly hard coded*/ ];
    connection.query(stmt, assistant, (err, results, fields) => {
        if (err) {
            console.error("error in entering assistant "+err);
        }
        else{  
            console.log("entered assistant successfully");
    }
    });
}

function insertStudent(req, assistant_code) {
    
    let stmt = `SELECT assistant_id FROM Assistant WHERE assistant_code = ?`;
    connection.query(stmt, [assistant_code], (err, results, fields) => {
        console.log(results);
        if (err) {
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




function insertCourse(course_name){
    let stmt = "INSERT INTO `course`( `course_name`, `admin_id`) VALUES (?,1)";
       connection.query(stmt, course_name, (err, results, fields) => {
        if (err) {
            console.error("error in entering course "+ err);
        }
        else{  
            console.log("entered course successfully");
    }
    });
}


function insertCenter(Center_name){
    let stmt = "INSERT INTO `center`( `center_name`) VALUES (?)";
       connection.query(stmt, Center_name, (err, results) => {
        if (err) {
            console.error("error in entering center "+ err);
        }
        else{  
            console.log("entered center successfully");
    }
    });
}



function insertLecture(center_name, course_id, day, hour){
    let stmt = "INSERT INTO `lecture`( `center_name`,'course_id') VALUES (?,?)";
       connection.query(stmt, [center_name, course_id], (err, results) => {
        if (err) {
            console.error("error in entering lecture "+ err);
        }
        else{  
            console.log("entered lecture successfully");
    }
    });
      stmt = "INSERT INTO `lec_timetable`( `center_name`,'course_id','day','hour') VALUES (?,?,?,?)";
    connection.query(stmt, [center_name, course_id, day, hour], (err, results) => {
        if (err) {
            console.error("error in entering lecture_timetable "+ err);
        }
        else{  
            console.log("entered lecture_timetable successfully");
    }
    });
}




function insertNewLecture(center_name, course_id, day, hour){
    stmt = "INSERT INTO lec_timetable (center_name, course_id, day, hour) VALUES (?,?,?,?)";
  connection.query(stmt, [center_name, course_id, day, hour], (err, results) => {
      if (err) {
          console.error("error in entering lecture_timetable "+ err);
      }
      else{  
          console.log("entered lecture_timetable successfully");
  }
  });
}




function insertAttendance(req, code){
    let stmt = "INSERT INTO `attendance`(lecture_num`, `center_name`, `course_id`, `assistant_id`, `student_code`, `Attended`) VALUES (?,?,?,?,?,?)";
       connection.query(stmt, [1 ,req.lec_num, req.center_name, req.course_id, code, req.code, req.attend], (err, results) => {
        if (err) {
            console.error("error in entering attendance "+ err);
        }
        else{  
            console.log("entered attendance successfully");
    }
    });
}

exports.insertLecture = insertLecture;

exports.insertAssistant = insertAssistant;
exports.insertNewLecture = insertNewLecture;
exports.insertLecture = insertLecture;
exports.insertStudent = insertStudent;
exports.isCodeUsed = isCodeUsed;
exports.insertCourse = insertCourse;
exports.insertCenter = insertCenter;
exports.insertAttendance = insertAttendance;
