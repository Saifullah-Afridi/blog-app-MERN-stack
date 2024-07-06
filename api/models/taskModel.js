const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  conpleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

//Export the model
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
