const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const category  = require("../models/category")
const { product } = require("../models/product")


const app = express();

require("dotenv").config();

require("cookie-parser");
app.use(express.json());

exports.displayChips = async(req,res)=>{
    const findAll = await category.find({typeName: "chip"}).populate('category')
    if(!findAll){
        console.log("Error")
    }else{
        res.json(findAll)
    }
}

exports.displayFood = async(req,res)=>{
    const findAll = await category.find({typeName: "food"})
    if(!findAll){
        console.log("Error")
    }else{
        res.json(findAll)
    }
}

exports.displayAccessory = async(req,res)=>{
    const findAll = await category.find({typeName: "accessory"}).populate('category')
    if(!findAll){
        console.log("Error")
    }else{
        res.json(findAll)
    }
}

exports.createProduct = async(req,res)=>{
    const { name, code, details, price, quantity, rating, review, type, image, subscription, color, gender, breed, age, material, category } = req.body;
    const newProduct = new product({
        name,
        code,
        details,
        price,
        quantity,
        rating,
        review,
        type,
        image,
        subscription,
        color,
        gender,
        breed,
        age,
        material,
        category,
      });
  
      await newProduct.save();

      res.json(newProduct)

}


