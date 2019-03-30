//Comment//
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create an new schema for MongoDB
const commentSchema = new Schema({
 
  body: { type: String, required: true },
  date: { type: Date, default: Date.now },
  userIds_that_liked_comment: {type: [String]},
  postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
});
//Models defined on the mongoose instance are available to all connection created
const Comment = mongoose.model("Comment", commentSchema);
//export the Comment schema  
module.exports = Comment;