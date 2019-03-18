const router = require("express").Router();
const usersRoutes = require("./users");
const tasksRoutes = require("./tasks");

// API routes
router.use("/api/users", usersRoutes);
router.use("api/tasks", tasksRoutes)

module.exports = router;