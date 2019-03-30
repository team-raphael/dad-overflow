const db = require("../models");

// Defining methods for the usersController
module.exports = {

    create: function (req, res) {

        const userBody = req.body;

        const newUser = {
            // need to match these properties with model schema
            email: userBody.email,
            displayName: userBody.displayName,
            image: userBody.image,
        };

        db.User
            .create(newUser)
            .then(newUser => res.json(newUser))
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        const valuesToUpdate = {};
        if (req.body.email) {
            valuesToUpdate.email = req.body.email;
        }

        if (req.body.image) {
            valuesToUpdate.image = req.body.image;
        }

        if (req.body.displayName) {
            valuesToUpdate.displayName = req.body.displayName;
        }

        db.User
            .findByIdAndUpdate(req.params.userId, { $set: valuesToUpdate })
            .then(updateUser => res.json(updateUser))
            .catch(err => res.status(422).json(err));
    },
    // find user by user unique id 
    findOne: function (req, res) {
        const userId = req.params.userId;
        db.User
            .findOne({_id: userId})
            .then(user => res.json(user))
            .catch(err => res.status(422).json(err));
    },
    findAll: function (req, res) {
        const filter = {};

        //Filter by email if provided as a query parameter
        if (req.query.email) {
            filter.email = req.query.email
        }

        db.User
            .find(filter)
            .then(users => res.json(users))
            .catch(err => res.status(422).json(err));
    },

    


};
