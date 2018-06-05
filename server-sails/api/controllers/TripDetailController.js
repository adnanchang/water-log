/**
 * TripDetailController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    signIn: function(req, res, next) {
        console.log(req.param('id'));
        var date = new Date(Date.now());
        console.log(date);
        TripDetail.update({
            id: req.param('id')
        }).set({
            signedInAt: date
        }).exec(function(err) {
            if (err) next(err);

            return res.redirect('/trip/userTrips');
        });
    },

    signOut: function(req, res, next) {
        console.log(req.param('id'));
        var date = new Date(Date.now());
        console.log(date);
        TripDetail.update({
            id: req.param('id')
        }).set({
            signedOutAt: date
        }).exec(function(err) {
            if (err) next(err);

            return res.redirect('/trip/userTrips');
        });
    }

};

