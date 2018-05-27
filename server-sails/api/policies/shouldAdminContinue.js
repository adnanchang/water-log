module.exports = function (req, res, next) {
    console.log(req.user);
    if (req.admin == null) {
        console.log("You have to be a user to access this");
        return res.json({
            err: 'You have to be a user to access this'
        });
    }
    next();
};
