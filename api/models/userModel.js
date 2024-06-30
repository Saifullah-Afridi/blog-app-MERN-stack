const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passwordValidator = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
  return regex.test(password);
};
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "please provide username "],
      unique: [true, "username must be unique"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "please provide email "],
      unique: [true, "email must be unique"],
      isLowercase: true,
      validate: [validator.isEmail, "please provide a valid email"],
      set: function (value) {
        return value.toLowerCase();
      },
      trim: true,
    },
    password: {
      type: String,
      required: [true, "please provide password"],
      // validate: {
      //   validator: passwordValidator,
      //   message:
      //     "Password will be at least 8 character and will have one letter,one sybmol and one digit",
      // },
    },
    confirmPassword: {
      type: String,
      // validate: {
      //   validator: function (el) {
      //     return this.password === el;
      //   },
      //   message: "The passwords must be matched",
      // },
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

const User = mongoose.model("User", userSchema);

module.exports = User;
