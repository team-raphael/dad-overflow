//User//
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create an new schema for MongoDB
const userSchema = new Schema({

  email: { type: String, required: true, unique: true },
  image: String,
  date: { type: Date, default: Date.now }

});
//Models defined on the mongoose instance are available to all connection created
const User = mongoose.model("User", userSchema);
//export the User schema 
module.exports = User;