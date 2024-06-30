const express = require("express");
const {
  SignUp,
  logIn,
  protectedRoute,
  me,
} = require("../controllers/authControllers");
const router = express.Router();

router.route("/sign-up").post(SignUp);
router.route("/login").post(logIn);
router.route("/me").get(protectedRoute, me);
module.exports = router;
