const AuthController = require("../controllers/AuthController");
const PostController = require("../controllers/PostController");
const CategoriesController = require("../controllers/Categories")
const Email = require("../utils/sendEmail");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/token", AuthController.token);
router.post("/signup", AuthController.signup);
router.post("/shopsignup", AuthController.shopsignup);
router.post("/vetsignup", AuthController.vetsignUp);
router.post("/signin", AuthController.signin);
router.post("/forgotPass", AuthController.forgotpassword, Email);
router.post("/post", AuthController.authenticateToken, PostController.addPost);
router.post("/reset/:token", AuthController.myReset);



router.get("/category/chips", CategoriesController.displayChips )
router.get("/category/food", CategoriesController.displayFood )
router.get("/category/accessories", CategoriesController.displayAccessory )
module.exports = router;
