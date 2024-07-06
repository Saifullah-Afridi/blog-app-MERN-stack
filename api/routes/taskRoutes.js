const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");
const { createTask, getSingleTask } = require("../controllers/taskControllers");

router.route("/").post(authController.protectedRoute, createTask);
router.route("/:id").get(authController.protectedRoute, getSingleTask);

module.exports = router;
