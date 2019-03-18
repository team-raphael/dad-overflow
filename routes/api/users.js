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
    // get all of user's tasks
    .get(tasksController.getUserTasks)
    //  create a new task
    .post(tasksController.createNewTask)


// Matches "api/users/:id/tasks/:id
router.route("/:userId/tasks/:taskId")

    // change this route to a put/update
    .put(tasksController.updateOneTask)

    // delete task
    .delete(tasksController.deleteOneTask)

module.exports = router;
