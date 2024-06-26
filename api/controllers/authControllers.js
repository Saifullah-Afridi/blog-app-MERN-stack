const User = require("../models/userModel");
const AppError = require("../utils/AppError");

const SignUp = async (req, res, next) => {
  const { userName, email, password, confirmPassword } = req.body;
  const transformedEmail = email.toLowerCase();

  try {
    const findUser = await User.findOne({ userName, transformedEmail });
    if (findUser) {
      return next(new AppError("This user already exist", 400));
    }
    const user = await User.create({
      userName,
      password,
      confirmPassword,
      email: transformedEmail,
    });
    res.status(201).json({ user: user, message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

const logIn = async function (req, res, next) {
  try {
    const { userName, email, password } = req.body;
    if ((!userName && !email) || !password) {
      return next(new AppError("Please provide username/email and password"));
    }
    const user = await User.findOne({ email });

    if (!user || !(await user.confirmPassword(password, user.password))) {
      return next(new AppError("Please provide coorect Credientials"));
    }

    res.status(200).json({ message: "you are loged in" });
  } catch (error) {
    next(error);
  }
};
module.exports = { SignUp, logIn };
