const jwt = require('jwt-simple');

function isauth(req) {
    if(!req.cookies.token)
        return false;
    token = req.cookies.token;
    var secret = 'xxx';
    try {
      const decoded = jwt.decode(token, secret);
      console.log(decoded);
      if (decoded.role)
        return true;
      else {
        return false;
      }
    } catch (err) {
  
      return false;
    }
  
}

function tokenize_assistant(code){
  var payload = {
    role: 'assistant',
    code: code
  };
  var secret = 'xxx';    //must be modified later with environment variables
  return jwt.encode(payload, secret);  //returns the token to be added to the cookie
}

exports.isauth = isauth;
exports.tokenize_assistant = tokenize_assistant;