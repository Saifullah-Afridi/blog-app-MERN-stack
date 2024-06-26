const express = require("express");
const { SignUp } = require("../controllers/authControllers");
const router = express.Router();

router.route("/sign-up").post(SignUp);
module.exports = router;
