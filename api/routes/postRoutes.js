const express = require("express");
const { protectedRoute, isAdmin } = require("../controllers/authControllers");
const { createPost, getSinglePost } = require("../controllers/postControllers");

const router = express.Router();
router.route("/").post(protectedRoute, isAdmin, createPost);
router.route("/:id  ").get(protectedRoute, isAdmin, getSinglePost);
module.exports = router;
