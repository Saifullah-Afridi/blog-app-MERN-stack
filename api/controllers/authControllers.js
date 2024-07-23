const { promisify } = require("util");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const SignUp = async (req, res, next) => {
  const { userName, email, password, confirmPassword } = req.body;
  console.log(req.body);

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

    const token = await user.generateJwtToken();
    res.setHeader("Cache-Control", "no-store");
    res.status(201).json({ message: "User created successfully", user, token });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

const logIn = async function (req, res, next) {
  try {
    const { userName, email, password } = req.body;
    if ((!userName && !email) || !password) {
      return next(
        new AppError("Please provide username/email and password", 400)
      );
    }
    let user;
    if (email) {
      user = await User.findOne({ email });
    }
    if (userName) {
      user = await User.findOne({ userName });
    }
    if (!user || !(await user.comparePassword(password, user.password))) {
      return next(new AppError("Please provide coorect Credientials", 400));
    }

    // this save function of mongoose will run the validator again if you use it
    // and if the validation fails it will give an error
    const token = await user.generateJwtToken(user);

    res
      .status(200)
      .cookie("access_token", token)
      .json({ status: "success", user, token });
  } catch (error) {
    next(error);
  }
};

const protectedRoute = async (req, res, next) => {
  try {
    let token;
    if (req.cookies.access_token) {
      token = req.cookies.access_token;
    }
    if (!token) {
      return next(new AppError("Please Log in,", 401));
    }
    const payload = await promisify(jwt.verify)(token, process.env.SECRET);
    const today = new Date();

    const isExpired = payload.exp * 1000 < today.getTime();
    if (isExpired) {
      return next(new AppError("The token is expired.Please Login again", 401));
    }

    const user = await User.findOne({
      _id: payload._id,
      "tokens.token": token,
    });

    if (token) {
      const tokenInside = await User.findOne({ "tokens.token": token });
      if (!tokenInside) {
        return res.status(200).json({
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
    res.clearCookie("access_token").status(200).json({
      status: "success",
      message: "User has been sign out",
    });
    // req.user.tokens = req.user.tokens.filter((token) => {
    //   return token.token !== req.token;
    // });
    // await req.user.save();

    // res.status(200).json({ status: "success", message: "you have Log out" });
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

const me = (req, res, next) => {
  res.send(req.user);
};

const uploadAvatar = (req, res, next) => {
  res.send("");
};

const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(new AppError("You are not allowed to delete this user", 400));
  }
  try {
    await User.deleteOne({ _id: req.user._id });
    res
      .status(200)
      .json({ status: "success", message: "User has been deleted" });
  } catch (error) {
    console.log(error.message);
  }
};

const updateMe = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return next(new AppError("You are not allowed to update this user", 400));
    }
    const userId = req.user.id;
    let user = await User.findById(userId);
    if (req.body.userName) {
      user.userName = req.body.userName;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.password) {
      if (!req.body.confirmPassword) {
        return next(new AppError("Please confirm Password", 400));
      } else if (req.body.password !== req.body.confirmPassword) {
        return next(new AppError("Passwords do not match", 400));
      }
      user.password = req.body.password;
      user.confirmPassword = req.body.confirmPassword;
    }

    await user.validate();
    user = await user.save();
    res.status(200).json({
      status: "success",
      message: "user Updated successfully",
      user: user,
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};
const googleAuth = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = await user.generateJwtToken();
      console.log(user);
      res.status(200).json({ status: "success", user, token });
    } else {
      const generatePassword = name + email;
      const newUser = await User.create({
        name: name.Math.random(),
        email: email,
        password: generatePassword,
        confirmPassword: generatePassword,
        profilePicture: googlePhotoUrl,
      });
      console.log(newUser);
      const token = await newUser.generateJwtToken();
      res.josn(200).json({
        status: "success",
        user: newUser,
        token,
      });
    }
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user && user.role === "admin") {
      next();
    } else {
      return next(new AppError("you are not allowed to perform this action"));
    }
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};
module.exports = {
  SignUp,
  logIn,
  protectedRoute,
  logout,
  me,

  logOutFromAllDevice,
  uploadAvatar,
  deleteUser,
  googleAuth,
  updateMe,
};
