const AuthController = require("../controllers/AuthController");
const PostController = require("../controllers/PostController");
const CategoriesController = require("../controllers/Categories")
const Email = require("../utils/sendEmail");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/category", CategoriesController.displayAll )

module.exports = router;
