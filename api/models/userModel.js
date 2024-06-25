const mongoose = require("mongoose");
const validator = require("validator");

const passwordValidator = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "please provide username "],
      unique: [true, "username must be unique"],
    },
    email: {
      type: String,
      required: [true, "please provide email "],
      unique: [true, "email must be unique"],
      validate: [validator.isEmail, "please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "please provide password"],
      validate: {
        validator: passwordValidator,
        message:
          "Password must be at least 8 characters long and include at least one uppercase letter, one digit, and one symbol",
      },
    },
    confirmPassword: {
      type: String,
      requied: [true, "please confirm your password"],
      validate: {
        validator: function (el) {
          return this.password === el;
        },
        message: "The passwords should be matched",
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
