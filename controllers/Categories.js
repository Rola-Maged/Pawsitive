const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const category  = require("../models/category")
const { product } = require("../models/product")
const { ObjectId } = require('mongodb')



const app = express();

require("dotenv").config();

require("cookie-parser");
app.use(express.json());


//const foodCategory = ObjectId('6647c1d5d14ccefe4cb431f0')
//const chipCategory = ObjectId('6647c34ad14ccefe4cb431f1')
//const accessoryCategory = ObjectId('6647c3d8d14ccefe4cb431f2')

exports.displayChips = async(req,res)=>{
    const findAll = await product.find({category: "6647c34ad14ccefe4cb431f1"})
    if(!findAll){
        console.log("Error")
    }else{
        res.json(findAll)
    }
}

exports.displayFood = async(req,res)=>{
    const findAll = await product.find({category: "6647c1d5d14ccefe4cb431f0"})
    if(!findAll){
        console.log("Error")
    }else{
        res.json(findAll)
    }
}

exports.displayAccessory = async(req,res)=>{
    const findAll = await product.find({category: "6647c3d8d14ccefe4cb431f2"})
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

exports.viewAll = async(req,res)=>{
    const findFood = await product.find({category: "6647c3d8d14ccefe4cb431f0"})
    const findChips = await product.find({category: "6647c3d8d14ccefe4cb431f1"})
    const findAccessories = await product.find({category: "6647c3d8d14ccefe4cb431f2"})
    const findAll = await product.find()
    if(!findAll){
        res.json("ERROR")
    }else{
        res.json(findAll)
    }
}

exports.searchAll = async(req,res)=>{
    const query = req.query.q;
    try {
        const results = await product.find({
            $or: [
                { name: new RegExp(query, 'i') }
            ]
        });
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while searching' });
    }
}



