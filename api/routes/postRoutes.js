const express = require("express");
const { protectedRoute, isAdmin } = require("../controllers/authControllers");
const {
  createPost,
  getSinglePost,
  getAllPosts,
  deletePost,
  updatePost,
} = require("../controllers/postControllers");

const router = express.Router();
router.route("/").post(protectedRoute, isAdmin, createPost);
router.route("/").get(getAllPosts);

router.route("/:id").get(protectedRoute, isAdmin, getSinglePost);
router.route("/:userId/:postId").delete(protectedRoute, isAdmin, deletePost);
router.route("/:userId/:postId").patch(protectedRoute, isAdmin, updatePost);
module.exports = router;
