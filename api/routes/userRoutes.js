const express = require("express");
const { protectedRoute, isAdmin } = require("../controllers/authControllers");
const { getAllUser } = require("../controllers/userControllers");

const router = express.Router();
router.get("/", protectedRoute, isAdmin, getAllUser);
module.exports = router;
