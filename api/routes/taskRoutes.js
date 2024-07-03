const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");
const { createTask } = require("../controllers/taskControllers");

router.route("/").post(authController.protectedRoute, createTask);

module.exports = router;
