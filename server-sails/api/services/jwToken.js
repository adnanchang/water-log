// * Service to generate JWT

var jwt = require('jsonwebtoken');

module.exports = {
	'sign': function(payload, type) {
		return jwt.sign({
      data: payload,
      type: type
		}, sails.config.secret, {expiresIn: "30m"});
	},
	'verify': function(token, callback) {
		jwt.verify(token, sails.config.secret, callback);
	},

  'create': function (user) {

  var u = {
    name: user.firstName +user.lastName ,
    username: user.username,
    _id: user._id.toString()
  };
  return token = jwt.sign(u, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24 // expires in 24 hours
  });
}
};
