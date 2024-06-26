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

const logIn = async function (req, res) {
  const { userName, email, password } = req.body;
  if ((!userName && !email) || !password) {
    return res
      .status(400)
      .json({ messsage: "Please provide correct Creditentials" });
  }
  const user = await User.findOne({ email });

  if (!user || !(await user.confirmPassword(password, user.password))) {
    return res
      .status(400)
      .json({ message: "Please provide correct email and password" });
  }

  res.status(200).token;
};
module.exports = { SignUp, logIn };
