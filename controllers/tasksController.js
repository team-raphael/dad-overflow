const db = require("../models");
/*
todos/tasks schema:
body
isComplete
ref to Users
*/

module.exports = {
  getUserTasks: function (req, res) {
    db.Task.find({ userId: req.params.userId })
      .sort({ date: -1 })
      .then(tasks => res.json(tasks))
      .catch(err => res.json(err));
  },

  getOneUserTask: function (req, res) {
    db.Task.findOne({
      _id: req.params.taskId,
      userId: req.params.userId
    })
      .then(task => res.json(task))
      .catch(err => res.json(err));
  },

  createNewTask: function (req, res) {
    const body = req.body;

    if (!body.userId) {
      body.userId = req.params.userId;
    }

    db.Task.create(body)
      .then(newTask => res.json(newTask))
      .catch(err => res.json(err));
  },

  // update a user's task by user's and task's id 
  updateOneTask: function (req, res) {
    const userId = req.params.userId;
    const body = req.body;
    const taskId = req.params.taskId;

    const valuesToUpdate = {};

    if (body.body != undefined &&
      body.body != null) {
      valuesToUpdate.body = body.body
    }

    if (body.isComplete != undefined &&
      body.isComplete != null) {
      valuesToUpdate.isComplete = body.isComplete;
    }

    db.Task.updateOne(
      { userId, _id: taskId },
      { $set: valuesToUpdate }
    ).then(userTasks => res.json(userTasks))
      .catch(err => res.json(err));

  },


  deleteOneTask: function (req, res) {
    const taskId = req.params.taskId;
    const userId = req.params.userId;

    db.Task.deleteOne({ _id: taskId, userId: userId })
      // returns http code for success
      .then(() => res.send())
      .catch(err => res.json(err));
  }
};
