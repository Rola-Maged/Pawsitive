const AuthController = require("../controllers/AuthController");
const PostController = require("../controllers/PostController");
const CategoriesController = require("../controllers/Categories")
const Email = require("../utils/sendEmail");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

//Sign up and Sign in and authenticastion (token) with reset and forgot password
router.post("/token", AuthController.token);
router.post("/signup", AuthController.signup);
router.post("/shopsignup", AuthController.shopsignup);
router.post("/vetsignup", AuthController.vetsignUp);
router.post("/signin", AuthController.signin);
router.post("/forgotPass", AuthController.forgotpassword, Email);
router.post("/post", AuthController.authenticateToken, PostController.addPost);
router.post("/reset/:token", AuthController.myReset);


//Displaying particular category of products
router.get("/category/chips", CategoriesController.displayChips )
router.get("/category/food", CategoriesController.displayFood )
router.get("/category/accessories", CategoriesController.displayAccessory )

//Displaying all products
router.get("/find", CategoriesController.viewAll)

//Creating Product from Shop's POV
router.post("/products/create", CategoriesController.createProduct)

//Search API by name of product
router.get("/search", CategoriesController.searchAll)

//Filter API for Products name + color
router.get("/filter", CategoriesController.filterProducts)


module.exports = router;
