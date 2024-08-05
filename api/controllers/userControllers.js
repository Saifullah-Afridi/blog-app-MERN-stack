const User = require("../models/userModel");
const AppError = require("../utils/AppError");

const getAllUser = async (req, res, next) => {
  const startIndex = parseInt(req.query.startIndex, 10) || 0;
  const limit = 9;
  try {
    const users = await User.find().skip(startIndex).limit(limit);
    if (!users) {
      return next(new AppError("No user found", 404));
    }
    res.status(200).json({ status: "success", users });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const deleteByAmin = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(req.params.id);
    if (user.role === "admin") {
      return next(new AppError("you can not delete admin", 500));
    }
    const deletedUser = await User.findOneAndDelete({ _id: id });
    res.status(200).json({
      status: "success",
      message: "User has been deleted",
      deletedUser,
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

module.exports = { getAllUser, deleteByAmin };
