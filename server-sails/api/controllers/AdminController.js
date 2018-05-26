/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt = require("bcrypt");
module.exports = {
  create: function(req, res, next) {
    // req.params.online = true;
    Admin.create(req.params.all(), function adminCreated(err, admin) {
      if (err) {
        console.log(err);

        return res.send(500, { error: err });
      }

      // Logging in admin
      return res.json({
        admin: admin,
        token: jwToken.sign(admin) //generate the token and send it in the response
      });
    });
  },

  login: function(req, res, next) {
    //Compare the password
    console.log(req.params.all());
    Admin.findOne({
      adminUsername: req.param("adminUsername")
    }).exec(function adminFound(err, admin) {
      if (err) {
        console.log(err);
        return res.send(500, { error: err });
      }
      if (!admin) {
        console.log("Admin not found");
        return res.send(500, { error: "Admin not found" });
      }
      console.log(admin);
      bcrypt.compare(req.param("adminPassword"), admin.adminEncryptedPassword, function(
        err,
        result
      ) {
        if (result) {
          //password is a match
          console.log('matched');
          return res.json({
            admin: admin,
            token: jwToken.sign(admin) //generate the token and send it in the response
          });
        } else {
          //password is not a match
          return res.forbidden({
            err: "Email and password combination do not match",
            code: 403
          });
        }
      });
    });
  },

  check: function(req, res) {
    //console.log(req.admin);
    return res.json(req.admin);
  },

  loggedInAdmin: function(req, res, next) {
    return res.json(req.admin);
  }
};
