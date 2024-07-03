const Task = require("../models/taskModel");

const createTask = (req, res, next) => {
  try {
    const task = Task.create({
      ...req.body,
      owner: req.user._id,
    });
    res.status(200).json({
      status: "success",
      task,
    });
  } catch (error) {}
};

module.exports = {
  createTask,
};
