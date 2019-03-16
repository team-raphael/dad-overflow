const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//EXAMPLE Schema
//const bookSchema = new Schema({
  //bookId: { type: String, required: true, unique: true },
  //smallThumbnail: String,
  //infoLink: String,
  //title: String,
  //authors: Array,
  //description: String,
  //date: { type: Date, default: Date.now }
//});

const postsSchema( {
  title: String,
  author: Array,
  body: String ,
  date: { type: Date, default: Date.now }
});

const commentsSchema({});

const todosSchema({});

const userSchema({});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;