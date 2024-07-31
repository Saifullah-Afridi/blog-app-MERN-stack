const express = require("express");
const { protectedRoute, isAdmin } = require("../controllers/authControllers");
const {
  createPost,
  getSinglePost,
  getAllPosts,
  deletePost,
} = require("../controllers/postControllers");

const router = express.Router();
router.route("/").post(protectedRoute, isAdmin, createPost);
router.route("/").get(getAllPosts);
router.route("/:userId/:postId").delete(protectedRoute, isAdmin, deletePost);
router.route("/:id  ").get(protectedRoute, isAdmin, getSinglePost);
module.exports = router;
