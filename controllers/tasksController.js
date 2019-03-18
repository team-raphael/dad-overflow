const db = require("../models");
/*
todos/tasks schema:

body
isComplete
ref to Users
*/

module.exports = {

    getUserTasks: function (req, res) {

    },

    createNewTask: function (req, res) {

    },


    // update a user's task by user's and task's id - MAY NOT BE RIGHT!
    updateOneTask: function (req, res) {
        const userId = req.params.userId;
        const body = req.body;

        db.Users
            .findOne({ _id: userId })
            .then(user => {
                return db.Tasks.update(
                    { _id: user._id },
                    {
                        $set:
                        {
                            body: body.body,
                            isComplete: body.isComplete
                        }

                    }
                )
            })
            .then(userTasks => res.json(userTasks))
            .catch(err => res.json(err));
    },

    deleteOneTask: function (req, res) {

    }
};

