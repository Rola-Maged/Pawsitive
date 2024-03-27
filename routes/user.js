const AuthController = require("../controllers/AuthController")
const express = require("express");
const router = express.Router();


router.post("/signup", AuthController.signup)
router.post("/signin", AuthController.signin)


const {isSignedIn}=require("../controllers/AuthController");
router.get('/testauthroute',isSignedIn,(req,res)=>{
    res.send("A protected route")
    res.json(req.auth)
    })


module.exports = router
