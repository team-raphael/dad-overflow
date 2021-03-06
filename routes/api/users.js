const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const tasksController = require("../../controllers/tasksController");
const commentsController = require("../../controllers/commentsController");

// USERS ROUTES

// Matches with "/api/users/"
router
  .route("/")
  //   post a user to the database
  .post(usersController.create)
  //  get all users
  .get(usersController.findAll);

// Matches with "/api/users/:id"
router
  .route("/:userId")
  // find one user by unique user id
  .get(usersController.findOne)
  // update one user by unique user id
  .put(usersController.update);


// TASKS ROUTES

// Matches "api/users/:id/tasks"
router
  .route("/:userId/tasks")
  // get all of user's tasks
  .get(tasksController.getUserTasks)
  //  create a new task
  .post(tasksController.createNewTask);

// Matches "api/users/:id/tasks/:id
router
  .route("/:userId/tasks/:taskId")

  // update one task
  .put(tasksController.updateOneTask)

  // delete task
  .delete(tasksController.deleteOneTask)

  // get task
  .get(tasksController.getOneUserTask);




  // / Matches with "/api/users/:id/comments/:id/adduseridtocommentdb"

router
  .route("/:userId/comments/:commentId/adduseridtocommentdb")
  .put(commentsController.addLikeToComment);


module.exports = router;
