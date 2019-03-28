const db = require("../models");

// CommentsController methods
module.exports = {

  getCommentsByPostId: (req, res) => {
    db.Comment
      .find({ postId: req.params.postId })
      .populate('userId')
      .sort({date: -1})
      .then(comments => res.json(comments))
      .catch(err => res.json(err));
      
  },

  createComment: (req, res) => {
    const body = req.body;

    if (!body.postId) {
      body.postId = req.params.postId;
    }

    db.Comment
      .create(body)
      .then(newComment => res.json(newComment))
      .catch(err => res.json(err));
  }
};