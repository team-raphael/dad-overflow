const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({

  title: { type: String, required: true },
  body: String,
  date: { type: Date, default: Date.now },
  //Associate a userId with the user that created the post
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;