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
exports.deleteAssistant = deleteAssistant;

