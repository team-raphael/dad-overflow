const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const tasksController = require("../../controllers/tasksController");

// USERS ROUTES 

// Matches with "/api/users/"
router.route("/")
    //   post a user to the database
    .post(usersController.create)

// Matches with "/api/users/:id"
router.route("/:userId")
    // find one user by unique user id 
    .get(usersController.findOne)


// TASKS ROUTES 

// Matches "api/users/:id/tasks"
router.route("/:userId/tasks")
    .get(tasksController.getUserTasks)


// Matches "api/users/:id/tasks/:id
router.route("/:userId/tasks/:taskId")
    .get(tasksController.getTaskByUserId)

module.exports = router;
