const express = require("express");
const { protectedRoute } = require("../controllers/authControllers");
const {
  createComment,
  getPostCommment,
} = require("../controllers/commentController");
const router = express.Router();

router.post("/", protectedRoute, createComment);
router.get("/post-comment", getPostCommment);

module.exports = router;
