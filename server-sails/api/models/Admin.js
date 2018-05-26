/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,

  attributes: {
    adminFirstName: {
      type: 'string'
    },

    adminLastName: {
      type: 'string'
    },

    adminEmail: {
      type: 'string',
      unique: true
    },

    adminUsername: {
      type: 'string',
      unique: true
    },

    adminEncryptedPassword: {
      type: 'string'
    },

    toJSON: function () {
      var obj = this.toObject();
      delete obj.adminEncryptedPassword;
      return obj
    }
  },

  beforeCreate: function (values, next) {
    require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
      if (err) return next(err);

      values.adminEncryptedPassword = encryptedPassword;
      next();
    })

  }
};

