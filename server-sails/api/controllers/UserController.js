/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt = require("bcrypt");
module.exports = {
  create: function (req, res, next) {
    // req.params.online = true;
    User.create(req.params.all(), function userCreated(err, user) {
      if (err) {
        console.log(err);

        return res.send(500, { error: err });
      }

      // Logging in user
      return res.json({
        user: user,
        token: jwToken.sign(user, "User") //generate the token and send it in the response
      });
    });
  },

  login: function (req, res, next) {
    //Compare the password
    console.log(req.params.all());
    User.findOne({
      username: req.param("username")
    }).exec(function userFound(err, user) {
      if (err) {
        console.log(err);
        return res.send(500, { err: err });
      }
      if (!user) {
        console.log("User not found");
        return res.send(500, { err: "User not found" });
      }
      console.log("here");
      bcrypt.compare(req.param("password"), user.encryptedPassword, function (
        err,
        result
      ) {
        if (result) {
          //password is a match
          console.log("matched");
          return res.json({
            user: user,
            token: jwToken.sign(user, "User") //generate the token and send it in the response
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

  check: function (req, res) {
    //console.log(req.user);
    return res.json(req.user);
  },

  loggedInUser: function (req, res, next) {
    console.log(req.user);
    return res.json(req.user.data);
  },

  updateA: function (req, res, next) {
    console.log(req.params.all());
    User.update({
      id: req.param("id")
    })
      .set({
        firstName: req.param("firstName"),
        lastName: req.param("lastName"),
        username: req.param("username")
      })
      .exec(function (err) {
        if (err) next(err);

        return res.redirect("/user/returnUser/" + req.param("id"));
      });
  },

  returnUser: function (req, res, next) {
    User.findOne({
      id: req.param("id")
    }).exec(function (err, user) {
      if (err) next(err);

      return res.json(user);
    });
  },

  update: function (req, res, next) {
    User.update({
      id: req.param("id")
    })
      .set({
        firstName: req.param("userFirstName"),
        lastName: req.param("userLastName")
      })
      .exec(function (err) {
        if (err) {
          return res.send(500, {
            err: "Could not be updated please try again"
          });
        }
        return res.json({});
      });
  },

  updatePassword: function (req, res, next) {
    console.log(req.params.all());
    require("bcrypt").hash(
      req.param("userPassword"),
      10,
      function passwordEncrypted(err, encryptedPassword) {
        if (err) return next(err);

        User.update({
          id: req.param("id")
        })
          .set({
            encryptedPassword: encryptedPassword
          })
          .exec(function (err) {
            if (err) {
              return res.send(500, {
                err: "Could not be updated please try again"
              });
            }
            return res.json({});
          });
      }
    );
  }
};
