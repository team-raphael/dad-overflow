const db = require("../models");

// CommentsController methods
module.exports = {
  getCommentsByPostId: (req, res) => {
    db.Comment.find({ postId: req.params.postId })
      .populate("userId")
      .sort({ date: -1 })
      .then(comments => res.json(comments))
      .catch(err => res.json(err));
  },

  createComment: (req, res) => {
    const body = req.body;

    if (!body.postId) {
      body.postId = req.params.postId;
    }

    db.Comment.create(body)
      .then(newComment => res.json(newComment))
      .catch(err => res.json(err));
  },

  addLikeToComment: (req, res) => {
    const { userId, commentId } = req.params;

    db.Comment.findOne({ _id: commentId }).then(dbComment => {
      if (dbComment.userIds_that_liked_comment.includes(userId)) {
        db.Comment.update(
          { _id: commentId },
          {
            $pull: {
              userIds_that_liked_comment: userId
            }
          }
        ).then(userId => res.json(userId));
      } else {
        db.Comment.update(
          { _id: commentId },
          {
            $addToSet: {
              userIds_that_liked_comment: userId
            }
          }
        ).then(userId => res.json(userId));
      }
    });
  }
};
