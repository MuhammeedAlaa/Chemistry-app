// jshint esversion:6
const connection = require('../config/database');

function getStudInfo(studCode, callback) {
    console.log(studCode);

    let stmt = "SELECT avg(grade) as 'Avg Grade',sum(attended) as 'Total Attendance',black_point as 'Total black points', avg(fullmark) as 'Full mark avg' from exam_grades NATURAL JOIN student NATURAL JOIN attendance NATURAL JOIN exam where student_code = ?";
    connection.query(stmt, studCode, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            let gradesarv = result[0]['Avg Grade'];
            let attendance = result[0]['Total Attendance'];
            let blackpoints = result[0]['Total black points'];
            let fullmarkavg = result[0]['Full mark avg'];
            console.log(gradesarv + attendance + blackpoints + fullmarkavg);

            if (!gradesarv) {
                gradesarv = 0;
            }
            if (!attendance) {
                attendance = 0;
            }
            if (!blackpoints) {
                blackpoints = 0;
            }
            if (!fullmarkavg) {
                fullmarkavg = 0;
            }
            callback(null, [gradesarv, attendance, blackpoints, fullmarkavg]);
        }
    });

}

function getAssistInfo(callback) {
    let stmt = "SELECT * FROM ASSISTANT";
    connection.query(stmt, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            let fullnames = [];
            let phones = [];
            let count = result.length;
            let assistId = [];
            let assistCode = [];
            let assistpasswords = [];
            result.forEach((assistant) => {
                if (assistant.fname == null) {
                    assistant.fname = '';
                }
                if (assistant.lname == null) {
                    assistant.lname = '';
                }

                if (assistant.phone == null) {
                    assistant.phone = '';
                }

                if (assistant.assistant_code == null) {
                    assistant.phone = 0;
                }

                if (assistant.assistant_id == null) {
                    assistant.assistant_id = 0;
                }

                if (assistant.password == null) {
                    assistant.password = '';
                }
                fullnames.push(assistant.fname + " " + assistant.lname);
                phones.push(assistant.phone);
                assistId.push(assistant.assistant_id);
                assistCode.push(assistant.assistant_code);
                assistpasswords.push(assistant.password);
            });
            callback(null, [fullnames, phones, count, assistId, assistCode, assistpasswords]);
        }
    });
}



function getStudentsInfo(callback) {
    let stmt = "SELECT * FROM STUDENT JOIN COURSE on student.course_id = course.course_id";
    connection.query(stmt, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            let fullnames = [];
            let phones = [];
            let parent_phones = [];
            let assistIds = [];
            let studCodes = [];
            let studpasswords = [];
            let blackpoints = [];
            let schools = [];
            let course_name = [];
            let course_id = [];
            result.forEach((student) => {
                if (student.fname == null) {
                    student.fname = '';
                }
                if (student.lname == null) {
                    student.lname = '';
                }

                if (student.phone == null) {
                    student.phone = '';
                }

                if (student.student_code == null) {
                    student.student_code = 0;
                }

                if (student.assistant_id == null) {
                    student.assistant_id = 0;
                }

                if (student.password == null) {
                    student.password = '';
                }

                if (student.parent_phone == null) {
                    student.parent_phone = '';
                }

                if (student.black_point == null) {
                    student.black_point = 0;
                }
                if (student.school == null) {
                    student.school = '';
                }
                if (student.course_name == null) {
                    student.course_name = '';
                }
                if (student.course_id == null) {
                    student.course_id = 0;
                }
                fullnames.push(student.fname + " " + student.lname);
                phones.push(student.phone);
                parent_phones.push(student.parent_phone);
                assistIds.push(student.assistant_id);
                blackpoints.push(student.black_point);
                studCodes.push(student.student_code);
                studpasswords.push(student.password);
                schools.push(student.school);
                course_name.push(student.course_name);
                course_id.push(student.course_id);
            });
            callback(null, [fullnames, phones, parent_phones, assistIds, studCodes, studpasswords, blackpoints, schools, course_id, course_name]);
        }
    });
}




function studentInfoCourse(CID, callback) {
    console.log(CID);

    let stmt = "SELECT * FROM STUDENT where course_id = ? ";
    connection.query(stmt, CID, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            let fullnames = [];
            let phones = [];
            let parent_phones = [];
            let assistIds = [];
            let studCodes = [];
            let studpasswords = [];
            let blackpoints = [];
            let schools = [];
            result.forEach((student) => {
                if (student.fname == null) {
                    student.fname = '';
                }
                if (student.lname == null) {
                    student.lname = '';
                }

                if (student.phone == null) {
                    student.phone = '';
                }

                if (student.student_code == null) {
                    student.student_code = 0;
                }

                if (student.assistant_id == null) {
                    student.assistant_id = 0;
                }

                if (student.password == null) {
                    student.password = '';
                }

                if (student.parent_phone == null) {
                    student.parent_phone = '';
                }

                if (student.black_point == null) {
                    student.black_point = 0;
                }
                if (student.school == null) {
                    student.school = '';
                }
                fullnames.push(student.fname + " " + student.lname);
                phones.push(student.phone);
                parent_phones.push(student.parent_phone);
                assistIds.push(student.assistant_id);
                blackpoints.push(student.black_point);
                studCodes.push(student.student_code);
                studpasswords.push(student.password);
                schools.push(student.school);
            });
            stmt = "SELECT student_code, grade FROM exam_grades where course_id = ?";
            connection.query(stmt, CID, (err, result2) => {
                if (err) {
                    callback(err, null);
                } else {
                    let scores = [];
                    let minscore = [];
                    let mincode = [];
                    result2.forEach((student) => {
                        mincode.push(student.student_code);
                        minscore.push(student.grade);
                    });

                    for (let stud = 0; stud < studCodes.length; stud++) {
                        const code = studCodes[stud];
                        if (mincode.indexOf(code) == -1) {
                            scores.push(0);
                        } else {
                            scores.push(minscore[mincode.indexOf(code)]);
                        }
                    }
                    let stmt = "SELECT ATTENDED, student_code  FROM attendance where course_id = ? ";
                    connection.query(stmt, CID, (err, result3) => {
                        if (err) {
                            callback(err, null);
                        } else {
                            let attend = [];
                            let mincode2 = [];
                            result3.forEach((student2) => {
                                attend.push(student2.ATTENDED);
                                mincode2.push(student2.student_code);
                            });
                            for (let stud = 0; stud < studCodes.length; stud++) {
                                const code = studCodes[stud];
                                if (mincode.indexOf(code) == -1) {
                                    attend.push(false);
                                } else {
                                    attend.push(attend[mincode2.indexOf(code)]);
                                }
                            }
                            callback(null, [fullnames, phones, parent_phones, assistIds, studCodes, studpasswords, blackpoints, schools, scores, attend]);
                        }
                    });
                }
            });
        }
    });
}

function studentInfoCourse2(CID, callback) {
    console.log(CID);
    let stmt = "SELECT * FROM STUDENT where course_id = ? ";
    connection.query(stmt, CID, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            let fullnames = [];
            let phones = [];
            let parent_phones = [];
            let assistIds = [];
            let studCodes = [];
            let studpasswords = [];
            let blackpoints = [];
            let schools = [];
            let attend = [];
            result.forEach((student) => {
                if (student.fname == null) {
                    student.fname = '';
                }
                if (student.lname == null) {
                    student.lname = '';
                }

                if (student.phone == null) {
                    student.phone = '';
                }

                if (student.student_code == null) {
                    student.student_code = 0;
                }

                if (student.assistant_id == null) {
                    student.assistant_id = 0;
                }

                if (student.password == null) {
                    student.password = '';
                }

                if (student.parent_phone == null) {
                    student.parent_phone = '';
                }

                if (student.black_point == null) {
                    student.black_point = 0;
                }
                if (student.school == null) {
                    student.school = '';
                }
                fullnames.push(student.fname + " " + student.lname);
                phones.push(student.phone);
                parent_phones.push(student.parent_phone);
                assistIds.push(student.assistant_id);
                blackpoints.push(student.black_point);
                studCodes.push(student.student_code);
                studpasswords.push(student.password);
                schools.push(student.school);
                let stmt = "SELECT ATTENDED FROM attendance where course_id = ? ";
                connection.query(stmt, CID, (err, result2) => {
                    if (err) {
                        callback(err, null);
                    } else {
                        console.log(result2);

                        result2.forEach((student2) => {
                            if (student2.ATTENDED)
                                attend.push("Attened");
                            else
                                attend.push("Absent");
                        });
                        callback(null, [fullnames, phones, parent_phones, assistIds, studCodes, studpasswords, blackpoints, schools, attend]);
                    }
                });
            });

        }
    });
}



function getCourseInfo(callback) {
    let stmt = "SELECT * FROM Course";
    connection.query(stmt, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            let course_name = [];
            let course_id = [];
            result.forEach((course) => {

                if (course.course_name == null) {
                    course.course_name = '';
                }

                if (course.course_id == null) {
                    course.course_id = 0;
                }
                course_name.push(course.course_name);
                course_id.push(course.course_id);
            });
            callback(null, [course_name, course_id]);
        }
    });
}

function getCenterInfo(callback) {
    let stmt = "SELECT * FROM Center";
    connection.query(stmt, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            let center_name = [];
            result.forEach((center) => {
                if (center.center_name == null) {
                    center.center_name = '';
                }
                center_name.push(center.center_name);
            });
            callback(null, center_name);
        }
    });
}


function getlectureInstanceInfo(callback) {
    let stmt = "SELECT lecture_num, center_name, course_name, date, day, hour, fullmark, course_id FROM " +
        "lecture NATURAL JOIN exam NATURAL JOIN course";
    connection.query(stmt, (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
}


function getlectureInfo(callback) {
    let stmt = "SELECT course_name, center_name, day, hour, course_id FROM lec_timetable NATURAL JOIN Course ";
    connection.query(stmt, (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
}

function getExam(req, callback) {
    let stmt = "SELECT exam_num FROM exam where course_id=? and center_name=? and lecture_num =?";
    connection.query(stmt, [req.params.co, req.params.cen, req.params.lec], (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows[0].exam_num);
        }
    });
}

function getlecturesnumber(course_id, center_name, callback) {
    let stmt = "SELECT lecture_num, day, hour FROM lecture where course_id = ? and center_name=?  ";
    connection.query(stmt, [course_id, center_name], (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            let lec_num = [];
            let day = [];
            let hour = [];
            rows.forEach((row) => {
                lec_num.push(row.lecture_num);
                day.push(row.day);
                hour.push(row.hour);
            });
            callback(null, [lec_num, day, hour]);
        }
    });
}


function getlectureInstanceInfo(callback) {
    let stmt = "SELECT lecture_num, center_name, course_name, date, day, hour, fullmark, course_id FROM " +
        "lecture NATURAL JOIN exam NATURAL JOIN course";
    connection.query(stmt, (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
}

exports.getAssistInfo = getAssistInfo;
exports.getStudentsInfo = getStudentsInfo;
exports.getStudInfo = getStudInfo;
exports.getCourseInfo = getCourseInfo;
exports.getCenterInfo = getCenterInfo;
exports.getlectureInfo = getlectureInfo;
exports.getlectureInstanceInfo = getlectureInstanceInfo;
exports.studentInfoCourse = studentInfoCourse;
exports.getlecturesnumber = getlecturesnumber;
exports.getExam = getExam;
exports.getlectureInstanceInfo = getlectureInstanceInfo;
exports.studentInfoCourse2 = studentInfoCourse2;