const Comment = require("../models/commentModel");
const AppError = require("../utils/AppError");

const createComment = async (req, res, next) => {
  try {
    const comment = await Comment.create({ ...req.body, user: req.user._id });
    res.status(201).json({ status: "success", comment });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

module.exports = { createComment };
