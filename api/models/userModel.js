const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("./taskModel");
const passwordValidator = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
  return regex.test(password);
};
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      minlength: [2, "Useranem must be at least 3 characters"],
      required: [true, "please provide username "],
      unique: [true, "username must be unique"],
      trim: true,
      set: function (value) {
        return value.toLowerCase();
      },
    },
    email: {
      type: String,
      required: [true, "please provide email "],
      unique: [true, "email must be unique"],
      trim: true,
      validate: [validator.isEmail, "please provide a valid email"],
      set: function (value) {
        return value.toLowerCase();
      },
      trim: true,
    },
    // profilePicture: {
    //   type: String,
    //   default:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd5avdba8EiOZH8lmV3XshrXx7dKRZvhx-A&s",
    // },
    password: {
      type: String,
      trim: true,
      required: [true, "please provide password"],
    },
    confirmPassword: {
      type: String,
      validate: {
        validator: function (el) {
          return this.password === el;
        },
        message: "The passwords must be matched",
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },

  { timestamps: true }
);

//run only onsave() and on  create()
// does not work with findbyidandupdate() and insertMany()
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return;
  }
  this.password = await bcryptjs.hash(this.password, 9);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.tokens;
  return user;
};
userSchema.methods.comparePassword = async function (
  enteredPassword,
  userPassword
) {
  return await bcryptjs.compare(enteredPassword, userPassword);
};

//statics method
//the model can use the methods define on statics
// userSchema.statics.findUser = function(docs,next){

// }
userSchema.methods.generateJwtToken = async function () {
  const token = await jwt.sign(
    { _id: this._id.toString() },
    process.env.SECRET,
    { expiresIn: "9 days" }
  );

  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};

userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

//when the remove method is called ,,before that method first this will called ..removing all the tasks of that user
userSchema.pre("remove", async function (next) {
  await Task.deleteMany({ owner: this._id });
  next();
});
const User = mongoose.model("User", userSchema);

module.exports = User;
