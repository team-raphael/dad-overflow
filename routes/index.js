const router = require("express").Router();
const bookRoutes = require("./books");

// API routes
router.use("/api/books", bookRoutes);

module.exports = router;