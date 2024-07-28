const express = require("express");
const { protectedRoute, isAdmin } = require("../controllers/authControllers");
const {
  createPost,
  getSinglePost,
  getAllPosts,
} = require("../controllers/postControllers");

const router = express.Router();
router.route("/").post(protectedRoute, isAdmin, createPost);
router.route("/").get(getAllPosts);
router.route("/:id  ").get(protectedRoute, isAdmin, getSinglePost);
module.exports = router;
