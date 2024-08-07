const express = require("express");
const { protectedRoute } = require("../controllers/authControllers");
const { createComment } = require("../controllers/commentController");
const router = express.Router();

router.post("/", protectedRoute, createComment);

module.exports = router;
