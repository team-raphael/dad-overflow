const db = require("../models");
/*
todos/tasks schema:

body
isComplete
ref to Users
*/

module.exports = {

    // get user by user's id from User DB and then use that id to find all their tasks in the Tasks db.
    getTaskByUserId: function (req, res) {
        const userId = req.params.userId;

        db.Users
            .findOne({ _id: userId })
            .then(user => {
                return db.Tasks.find({ _id: user })
            })
            .then(userTasks => res.json(userTasks))
            .catch(err => res.json(err));
    },

    getUserTasks: function (req, res) {
        const userId = req.params.userId;
        const taskId = req.params.taskId;

    }
};

