const router = require("express").Router();
const users = require("./users");
// const tasksRoutes = require("./tasks");

// API routes
router.use("/users", users);

module.exports = router;