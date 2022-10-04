const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "You must provide a name"],
    trim: "true",
  },
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  parentID: {
    type: String,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
