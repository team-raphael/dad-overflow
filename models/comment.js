//Comment//
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create an new schema for MongoDB
const commentSchema = new Schema({
 
  body: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now }

});
//Models defined on the mongoose instance are available to all connection created
const Comment = mongoose.model("Comment", commentSchema);
//export the Comment schema  
module.exports = Comment;g