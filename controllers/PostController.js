const User = require("../models/user")
const jwt = require("jsonwebtoken")
const {expressjwt} = require("express-jwt")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv")
dotenv.config();







exports.addPost = async(req,res)=>{
    try{
        res.json("HELLO USER!")
    }catch (error){
        console.error(error)

}}







