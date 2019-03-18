const db = require("../models");

// Defining methods for the usersController
module.exports = {

    create: function (req, res) {

        const userBody = req.body;
        const newUser = {
            // need to match these properties with model schema
            email: userBody.email,
            image: userBody.email,
        };

        db.Users
            .create(newUser)
            .then(newUser => res.json(newUser))
            .catch(err => res.status(422).json(err));
    },
    // find user by user unique id 
    findOne: function (req, res) {
        const userId = req.params.userId;
        db.Users
            .findOne({_id: userId})
            .then(user => res.json(user))
            .catch(err => res.status(422).json(err));
    }

};
