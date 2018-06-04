/**
 * TripController
 *
 * @description :: Server-side logic for managing trips
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req, res, next) {
        console.log(req.params.all());
        // CREATE TRIP
        // CREATE TRIP DETAILS FOR EVERY USER
        Trip.create({
            boat: req.param('boat'),
            startTime: req.param('startTime'),
            endTime: req.param('endTime')
        }).exec(function(err, trip) {
            if (err) {
                return res.send(500, {
                    err: err
                });
            }

            var tripDetails = [];
            req.param('selectedUsers').forEach(user => {
                var details = {
                    trip: trip.id,
                    user: user.id,
                    signedInAt: null,
                    signedOutAt: null
                }
                tripDetails.push(details);
            });

            TripDetail.createEach(tripDetails).exec(function(err, details){
                if (err) {
                    return res.send(500, {
                        err: err
                    });
                }

                return res.json(trip);
            });

        });
    },

    delete: function(req, res, next) {
        Trip.destory({
            id: req.param('id')
        }).exec(function(err) {
            if (err) next(err);

            return res.send(200);
        });
    }
};

