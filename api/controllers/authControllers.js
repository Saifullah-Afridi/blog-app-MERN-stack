const { promisify } = require("util");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");

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

const protectedRoute = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return next(new AppError("Please Log in,", 404));
    }

    const payload = await promisify(jwt.verify)(token, process.env.SECRET);
    const today = new Date();

    const isExpired = payload.exp * 1000 < today.getTime();
    if (isExpired) {
      return next(new AppError("The token is expired.Please Login again", 400));
    }

    const user = await User.findOne({
      _id: payload._id,
      "tokens.token": token,
    });

    if (token) {
      const tokenInside = await User.findOne({ "tokens.token": token });
      if (!tokenInside) {
        res.status(200).json({
          status: "fail",
          message: "The token does not exist please log in",
        });
      }
    }

    if (!user) {
      return next(
        new AppError("The token does not exist please try again later ", 400)
      );
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.status(200).json({ status: "success", message: "you have Log out" });
  } catch (error) {
    next(new AppError("Internal server Error", 500));
  }
};

const logOutFromAllDevice = async (req, res, next) => {
  req.user.tokens = req.user.tokens.filter((token) => {
    return token.token === req.token;
  });
  await req.user.save();
  res.status(200).json({
    status: "success",
    message: "You have been logout from all other devices",
  });
};

const protectedRouteexample = (req, res, next) => {
  res.send("hello from here");
};

const me = (req, res, next) => {
  res.send(req.user);
};

module.exports = {
  SignUp,
  logIn,
  protectedRoute,
  logout,
  me,
  protectedRouteexample,
  logOutFromAllDevice,
};
