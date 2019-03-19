const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({

  body: String,
  isComplete: { type: Boolean, required: true, default: "false" },
  date: { type: Date, default: Date.now },
  //Associate the _id from the User model to the task
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;