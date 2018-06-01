/**
 * TripDetail.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //Connection to Trip
    trip: {
      model: 'Trip'
    },

    //Connection to User
    user: {
      model: 'User'
    },

    signedInAt: {
      type: 'datetime'
    },

    signedOutAt: {
      type: 'datetime'
    }

  },

};

