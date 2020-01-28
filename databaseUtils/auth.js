// jshint esversion:6
const connection = require('../config/database');

function is_assistant(code, password) {
    let stmt = `select count(*) from Assistant where assistant_code = ? and password = ?`;
    let assistant = [code, password];
    let noice = connection.query(stmt, assistant, (err, results, fields) => {
        if (err) {
            console.error(err.message);
            return false;
        } else {
            if (results[0]['count(*)'] == 1){
                console.log('noice');
                return true;
            }
            else{
                console.log(results[0]);
                return false;
            }
        }
    });
    return noice;
}



exports.is_assistant = is_assistant;