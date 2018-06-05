module.exports = function(req, res, next) {
  var token;
  //Check if authorization header is present
  if (req.headers && req.headers.authorization) {
    //authorization header is present
    var parts = req.headers.authorization.split(" ");
    if (parts.length == 2) {
      var scheme = parts[0];
      var credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
        console.log(token);
      }
    } else {
      return res.json(401, { err: "Format is Authorization: Bearer [token]" });
    }
  } else {
    //authorization header is not present
    console.log("No Authorization header was found");
    return res.json(401, { err: "No Authorization header was found" });
  }
  jwToken.verify(token, function(err, decoded) {
    if (err) {
      console.log("Token is invalid");
      return res.json(401, { err: "Invalid token" });
    }

    if (decoded.type == 'Admin') {
      req.admin = decoded;
    } else {
      req.user = decoded;
    }
    next();
  });
};
