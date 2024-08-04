const User = require("../models/userModel");
const AppError = require("../utils/AppError");

const getAllUser = async (req, res, next) => {
  const startIndex = parseInt(req.query.startIndex, 10) || 0;
  const limit = parseInt(req.query.limit, 10) || 9;
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

module.exports = { getAllUser };
