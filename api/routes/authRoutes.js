const express = require("express");
const {
  SignUp,
  logIn,
  logout,
  protectedRoute,
  me,
  protectedRouteexample,
  logOutFromAllDevice,
  uploadAvatar,
} = require("../controllers/authControllers");
const multer = require("multer");
const router = express.Router();
const avatar = multer({
  dest: "images",
});
router.route("/sign-up").post(SignUp);
router.route("/log-in").post(logIn);
router.route("/log-out").get(protectedRoute, logout);
router.route("/log-out/devices").get(protectedRoute, logOutFromAllDevice);
router.route("/me").get(protectedRoute, me);
router.route("/check").get(protectedRoute, protectedRouteexample);
router.route("/avatar").post(avatar.single("profile"), uploadAvatar);
module.exports = router;
