const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const category  = require("../models/category");
const { product } = require("../models/product");
const { ObjectId } = require('mongodb');
const { user } = require("../models/user");
const { shop } = require("../models/shop");



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

// Create a new product
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


// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await product.find().populate('category');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
    try {
        const singleProduct = await product.findById(req.params.id).populate('category');
        if (!singleProduct) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(singleProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a product
exports.updateProd = async (req, res) => {
    const { name, code, details, price, quantity, rating, review, type, image, subscription, color, gender, breed, age, material, category } = req.body;
    try {
        const updateProduct = await product.findByIdAndUpdate(
            req.params.id,
            { name, code, details, price, quantity, rating, review, type, image, subscription, color, gender, breed, age, material, category },
            { new: true }
        );
        if (!updateProduct) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(updateProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a product
exports.deleteProd = async (req, res) => {
    try {
        const deleteProduct = await product.findByIdAndDelete(req.params.id);
        if (!deleteProduct) return res.status(404).json({ message: "Product not found" });
        res.status(200).json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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

exports.filterProducts = async(req,res)=>{
    try {
        const { name, color } = req.query;
    
        const filter = {};
        if (name) filter.name = name;
        if (color) filter.color = color;
    
        
        const filteredData = await product.find(filter);
    
        res.json(filteredData);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    
}


// Create a new category
exports.createCategory = async (req, res) => {
    const { name, typeName } = req.body;
    try {
        const newCategory = new category({ name, typeName });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all categories
exports.getCategories = async (req, res) => {
    try {
        const allCategories = await category.find();
        res.status(200).json(allCategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const singleCategory = await category.findById(req.params.id);
        if (!singleCategory ) return res.status(404).json({ message: "Category not found" });
        res.status(200).json(singleCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a category
exports.updateCat = async (req, res) => {
    const { name, typeName } = req.body;
    try {
        const updateCategory = await category.findByIdAndUpdate(
            req.params.id,
            { name, typeName },
            { new: true }
        );
        if (!updateCategory) return res.status(404).json({ message: "Category not found" });
        res.status(200).json(updateCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a category
exports.deleteCat = async (req, res) => {
    try {
        const deleteCategory = await category.findByIdAndDelete(req.params.id);
        if (!deleteCategory) return res.status(404).json({ message: "Category not found" });
        res.status(200).json({ message: "Category deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get a shop by ID
exports.getShopById = async (req, res) => {
    try {
        const singleShop = await shop.findById(req.params.id);
        if (!singleShop ) return res.status(404).json({ message: "shop not found" });
        res.status(200).json(singleShop);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Update a shop
exports.updateShop = async (req, res) => {
    const { name, password, email, address, phone, taxRegister, offerings } = req.body;
    try {
        const updatedShop = await shop.findByIdAndUpdate(
            req.body.id,
            { name, password, email, address, phone, taxRegister, offerings },
            { new: true }
        );
        if (!updatedShop) return res.status(404).json({ message: "shop not found" });
        res.status(200).json(updatedShop);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a shop
exports.deleteShop = async (req, res) => {
    try {
        const deletedShop = await shop.findByIdAndDelete(req.body.id);
        if (!deletedShop) return res.status(404).json({ message: "shop not found" });
        res.status(200).json({ message: "shop deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
    try {
        const singleUser = await user.findById(req.params.id);
        if (!singleUser ) return res.status(404).json({ message: "user not found" });
        res.status(200).json(singleUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Update a user
exports.updateUser = async (req, res) => {
    const { name, password, email, address, gender, age, phone } = req.body;
    try {
        const updatedUser = await user.findByIdAndUpdate(
            req.body.id,
            { name, password, email, address, gender, age, phone },
            { new: true }
        );
        if (!updatedUser) return res.status(404).json({ message: "user not found" });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await user.findByIdAndDelete(req.body.id);
        if (!deletedUser) return res.status(404).json({ message: "user not found" });
        res.status(200).json({ message: "user deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};