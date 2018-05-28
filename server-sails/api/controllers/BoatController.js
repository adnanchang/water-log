/**
 * BoatController
 *
 * @description :: Server-side logic for managing boats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function (req, res, next) {
        Boat.create(req.params.all()).exec(function (err, boat) {
            if (err) next(err);

            return res.json(boat);
        });
    },

    update: function (req, res, next) {
        Boat.update({
            id: req.param('id')
        }).set({
            name: req.param('name')
        }).exec(function (err) {
            if (err) next(err);

            return res.redirect('/boat/returnBoat/' + req.param('id'));
        })
    },

    returnBoat: function (req, res, next) {
        Boat.findOne({
            id: req.param('id')
        }).exec(function (err, boat) {
            if (err) {
                res.send(500, { error: 'Boat not found' });
            }

            res.json(boat);
        });
    },

    delete: function (req, res, next) {
        Boat.destroy({ id: req.params.id }).exec(function (err) {
            if (err) {
                res.send(500, { error: 'Database Error' });
            }
            res.send(200);
        });
    }
};

