const jwt = require('jwt-simple');

function isauth(req) {
    if(!req.cookies.token)
        return null;
    token = req.cookies.token;
    var secret = 'xxx';
    try {
      const decoded = jwt.decode(token, secret);
      //console.log(decoded);
      if (decoded.role)
        return decoded;
      else {
        return null;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  
}

function tokenize_assistant(code,data){
  var payload = {
    role: 'assistant',
    code: code,
    name: data
  };
  var secret = 'xxx';    //must be modified later with environment variables
  return jwt.encode(payload, secret);  //returns the token to be added to the cookie
}

function tokenize_student(code,data){
  var payload = {
    role: 'student',
    code: code,
    name: data
  };
  var secret = 'xxx';    //must be modified later with environment variables
  return jwt.encode(payload, secret);  //returns the token to be added to the cookie
}

exports.isauth = isauth;
exports.tokenize_assistant = tokenize_assistant;
exports.tokenize_student = tokenize_student;