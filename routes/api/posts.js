const router = require("express").Router();
const postsController = require("../../controllers/postsController");
const commentsController = require("../../controllers/commentsController");
const authenticate = require("./authenticate");

// Posts routes
//api/posts/
router
  .route("/")
  .get(postsController.findAll)
  .post(authenticate, postsController.create);

 // api/posts/id
router.route("/:id")
  .get(postsController.findOne);

// Comments routes
// api/posts/postid/comments
router
  .route("/:postId/comments")
  .get(commentsController.getCommentsByPostId)
  .post(authenticate, commentsController.createComment)


module.exports = router;
  