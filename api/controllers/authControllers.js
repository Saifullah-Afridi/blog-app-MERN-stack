const User = require("../models/userModel");
const AppError = require("../utils/AppError");

const SignUp = async (req, res, next) => {
  const { userName, email, password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      return next(new AppError("Passwords do not match", 400));
    }
    const findUser = await User.findOne({ userName, email });
    if (findUser) {
      return next(new AppError("This user already exist", 400));
    }

    const user = new User(req.body);
    await user.save();
    console.log(user);
    const token = await user.generateJwtToken();
    res.status(201).json({ message: "User created successfully", user, token });
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
    let user;
    if (email) {
      user = await User.findOne({ email });
    } else if (userName) {
      user = await User.findOne({ userName });
    }
    if (!user || !(await user.comparePassword(password, user.password))) {
      return next(new AppError("Please provide coorect Credientials"));
    }

    // this save function of mongoose will run the validator again if you use it
    // and if the validation fails it will give an error
    const token = await user.generateJwtToken(user);

    res.status(200).json({ status: "success", user, token });
  } catch (error) {
    next(error);
  }
};
module.exports = { SignUp, logIn };
