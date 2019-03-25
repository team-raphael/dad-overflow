//Task//
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create an new schema for MongoDB
const taskSchema = new Schema({

  body: {
    type: String,
    trim: true,
    required: 'Please enter a task!',
    validate: [
      function(input) {
        return input.length >= 4;
      },
      "Task length should be longer than four characters long!"
    ]
  },
  isComplete: { type: Boolean, required: true, default: "false" },
  date: { type: Date, default: Date.now },
  //Associate the _id from the User model to the task
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
});
//Models defined on the mongoose instance are available to all connection created
const Task = mongoose.model("Task", taskSchema);
//export the Task schema  
module.exports = Task;