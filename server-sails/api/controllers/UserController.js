/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create: function(req, res, next) {
    // req.params.online = true;
    User.create(req.params.all(), function userCreated(err, user) {
      if (err) {
        console.log(err);

        return res.send(500, { error: err });
      }

      // Logging in user
      return res.json({
        user: user,
        token: jwToken.sign(user) //generate the token and send it in the response
      });
    });
  },

  login: function(req, res) {
    //Compare the password
    bcrypt.compare(req.body.password, user.encryptedPassword, function(
      err,
      result
    ) {
      if (result) {
        //password is a match
        return res.json({
          user: user,
          token: jwToken.sign(user) //generate the token and send it in the response
        });
      } else {
        //password is not a match
        return res.forbidden({
          err: "Email and password combination do not match"
        });
      }
    });
  }
};
