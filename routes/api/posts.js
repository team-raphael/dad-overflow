const router = require("express").Router();
const postsController = require("../../controllers/postsController");
const commentsController = require("../../controllers/commentsController");

// Posts routes
router
  .route("/")
  .get(postsController.findAll)
  .post(postsController.create);

router.route("/:id")
  .get(postsController.findOne);

// Comments routes

router
  .route("/:id/comments")
  .get(commentsController.getCommentsByPostId)
  .post(commentsController.createComment);


module.exports = router;
  