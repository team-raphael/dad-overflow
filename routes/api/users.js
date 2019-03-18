const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/users/"
router.route("/")
    //   post a user to the database
    .post(usersController.create)


// Matches with "/api/users/:id"
router.route("/:id")
    // find one user by unique user id 
    .get(usersController.findOne)

module.exports = router;
