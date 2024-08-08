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

const getPostCommment = async (req, res, next) => {
  try {
    console.log(req.query.postId);

    const { postId } = req.query;
    const comments = await Comment.find({ post: postId })
      .sort({ createdAt: -1 })
      .populate("user");
    if (!comments) {
      return next(new AppError("No comment is found", 400));
    }
    res
      .status(200)
      .json({ status: "success", numberOfComment: comments.length, comments });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};
module.exports = { createComment, getPostCommment };
