const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");
const {
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskControllers");

router.route("/").post(authController.protectedRoute, createTask);
router.route("/:id").get(authController.protectedRoute, getSingleTask);
router.route("/:id").delete(authController.protectedRoute, updateTask);
router.route("/:id").patch(authController.protectedRoute, deleteTask);

module.exports = router;
