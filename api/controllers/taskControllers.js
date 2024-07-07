const Task = require("../models/taskModel");
const AppError = require("../utils/AppError");

const createTask = async (req, res, next) => {
  try {
    const task = await Task.create({
      ...req.body,
      owner: req.user._id,
    });
    res.status(200).json({
      status: "success",
      task,
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

const getSingleTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return next(new AppError("This task does not exist", 404));
    }
    res.status(200).json({
      status: "success",
      task,
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

const updateTask = async (req, res, next) => {
  const task = await Task.findOneAndUpdate(
    {
      _id: req.params.id,
      owner: req.user._id,
    },
    req.body,
    { new: true, runValidators: true }
  );
  if (!task) {
    return next(new AppError("The task does not exist", 404));
  }
  res.status(200).json({
    status: "success",
    task,
  });
};
const deleteTask = async (req, res, next) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    owner: req.user._id,
  });
  if (!task) {
    return next(new AppError("The task does not exist", 404));
  }
  res.status(200).json({
    status: "success",
    message: "The Task has been deleted",
  });
};

module.exports = {
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
