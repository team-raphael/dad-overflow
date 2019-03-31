const router = require("express").Router();
const users = require("./users");
const posts = require("./posts");
const authenticate = require("./authenticate");
// const tasksRoutes = require("./tasks");

// API routes
router.use("/users", authenticate, users);
router.use("/posts", posts);

module.exports = router;