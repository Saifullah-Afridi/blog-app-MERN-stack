const express = require("express");
const { protectedRoute, isAdmin } = require("../controllers/authControllers");
const { getAllUser, deleteByAmin } = require("../controllers/userControllers");

const router = express.Router();
router.get("/", protectedRoute, isAdmin, getAllUser);
router.delete("/delete-by-admin/:id", protectedRoute, isAdmin, deleteByAmin);
module.exports = router;
