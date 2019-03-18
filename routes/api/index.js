const router = require("express").Router();
const usersAndTasksRoutes = require("./usersAndTasks");
// const tasksRoutes = require("./tasks");

// API routes
router.use("/api/users", usersAndTasksRoutes);
// router.use("api/users", tasksRoutes)

module.exports = router;