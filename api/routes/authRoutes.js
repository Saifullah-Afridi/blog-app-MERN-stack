const express = require("express");
const { SignUp, logIn } = require("../controllers/authControllers");
const router = express.Router();

router.route("/sign-up").post(SignUp);
router.route("/login").post(logIn);
module.exports = router;
