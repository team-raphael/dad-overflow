const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
 
  body: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
  postId: { type: Schema.Types.ObjectId, ref: "Post", required: true }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;