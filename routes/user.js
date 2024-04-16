const AuthController = require("../controllers/AuthController")
const PostController = require("../controllers/PostController")
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")








router.post("/token", AuthController.token)
router.post("/signup",AuthController.signup)
router.post("/signin", AuthController.signin)
router.post("/forgot", AuthController.forgotpassword, AuthController.resetpassword)
router.post("/signout", AuthController.signout)

router.post("/post", AuthController.authenticateToken, PostController.addPost)





module.exports = router
