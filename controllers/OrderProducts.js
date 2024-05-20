const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const orderProduct  = require("../models/orderProduct")
const { ObjectId } = require('mongodb')




// Create a new product
exports.createOrderProd= async(req,res)=>{
    const { quantity, price, date, order, product } = req.body;
    const newOrderProduct = new orderProduct({
        quantity,
         price, 
         date,
         order,
         product,
      });
  
      await newOrderProduct.save();

      res.json(newOrderProduct)

}


// Get all products
exports.getOrderProduct = async (req, res) => {
    try {
        const orderedProd = await orderProduct.find();
        res.status(200).json(orderedProd);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a product by ID
exports.getOrderProductById = async (req, res) => {
    try {
        const singleOrderProduct = await orderProduct.findById(req.body.id);
        if (!singleOrderProduct) return res.status(404).json({ message: "the ordered product is not found" });
        res.status(200).json(singleOrderProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a product
exports.updateOrderProd = async (req, res) => {
    const { quantity, price, date, order, product } = req.body;
    try {
        const updateOrderedProduct = await orderProduct.findByIdAndUpdate(
            req.body.id,
            { quantity, price, date, order, product },
            { new: true }
        );
        if (!updateOrderedProduct) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(updateOrderedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a product
exports.deleteOrderProd = async (req, res) => {
    try {
        const deleteOrderedProduct = await orderProduct.findByIdAndDelete(req.body.id);
        if (!deleteOrderedProduct) return res.status(404).json({ message: "Product not found" });
        res.status(200).json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};