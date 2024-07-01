const express = require("express");
const {
  SignUp,
  logIn,
  logout,
  protectedRoute,
  me,
  protectedRouteexample,
  logOutFromAllDevice,
} = require("../controllers/authControllers");
const router = express.Router();

router.route("/sign-up").post(SignUp);
router.route("/log-in").post(logIn);
router.route("/log-out").get(protectedRoute, logout);
router.route("/log-out/devices").get(protectedRoute, logOutFromAllDevice);
router.route("/me").get(protectedRoute, me);
router.route("/check").get(protectedRoute, protectedRouteexample);
module.exports = router;
