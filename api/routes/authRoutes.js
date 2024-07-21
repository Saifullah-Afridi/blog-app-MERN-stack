const express = require("express");
const {
  SignUp,
  logIn,
  logout,
  protectedRoute,
  me,

  logOutFromAllDevice,
  uploadAvatar,
  deleteMe,
  googleAuth,
  updateMe,
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
``;
router.route("/avatar").post(avatar.single("profile"), uploadAvatar);
router.route("/delete-me").delete(protectedRoute, deleteMe);
router.post("/google", googleAuth);
router.patch("/update-me/:id", protectedRoute, updateMe);
module.exports = router;
