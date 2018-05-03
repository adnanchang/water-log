/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    firstName: {
      type: 'string'
    },

    lastName: {
      type: 'string'
    },

    email: {
      type: 'string',
      unique: true
    },

    username: {
      type: 'string',
      unique: true
    },

    encryptedPassword: {
      type: 'string'
    },

    toJSON: function () {
      var obj = this.toObject();
      delete obj.encryptedPassword;
      return obj
    }
  },

  beforeCreate: function (values, next) {
    require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
      if (err) return next(err);

      values.encryptedPassword = encryptedPassword;
      next();
    })

  }
};

