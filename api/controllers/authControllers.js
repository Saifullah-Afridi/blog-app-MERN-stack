const User = require("../models/userModel");

const SignUp = async (req, res) => {
  const { userName, email, password, confirmPassword } = req.body;
  const transformedEmail = email.toLowerCase();

  try {
    // if(!userName || !)
    const findUser = await User.findOne({ userName, transformedEmail });
    if (findUser) {
      return res.this.status(400).json({ message: "This user already exist" });
    }
    const user = await User.create({
      userName,
      password,
      confirmPassword,
      email: transformedEmail,
    });
    res.status(201).json({ user: user, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { SignUp };
