const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const Joi = require("joi");
const nodemailer = require("nodemailer");
// const sendEmail = require("../utils/sendEmail")
dotenv.config();
const express = require("express");
const { user } = require("../models/user");
const { vet } = require("../models/vet");
const { shop } = require("../models/shop");
const category  = require("../models/category")

ACCESS_TOKEN_SECRET = "hello";
REFRESH_TOKEN_SECRET = "helloAgain";

const app = express();

require("dotenv").config();

require("cookie-parser");
app.use(express.json());

exports.displayChips = async(req,res)=>{
    const findAll = await category.find({type: "chip"})
    if(!findAll){
        console.log("Error")
    }else{
        res.json(findAll)
    }
}

exports.displayFood = async(req,res)=>{
    const findAll = await category.find({type: "food"})
    if(!findAll){
        console.log("Error")
    }else{
        res.json(findAll)
    }
}

exports.displayAccessory = async(req,res)=>{
    const findAll = await category.find({type: "accessory"})
    if(!findAll){
        console.log("Error")
    }else{
        res.json(findAll)
    }
}





