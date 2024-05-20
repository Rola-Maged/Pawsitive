const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cart  = require("../models/cart")
const { ObjectId } = require('mongodb')




// Create a new cart
exports.createCart = async(req,res)=>{
    const { date, type, quantity, status } = req.body;
    const newCart = new cart({
        date, 
        type,
        quantity,
        status,
      });
  
      await newCart.save();

      res.json(newCart)

}


// Get all carts
exports.getCart = async (req, res) => {
    try {
        const Carts = await cart.find();
        res.status(200).json(Carts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a cart by ID
exports.getCartById = async (req, res) => {
    try {
        const singleCart = await cart.findById(req.body.id);
        if (!singleCart) return res.status(404).json({ message: "cart not found" });
        res.status(200).json(singleCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a cart
exports.updateCart = async (req, res) => {
    const { date, type, quantity, status } = req.body;
    try {
        const updatedCart = await cart.findByIdAndUpdate(
            req.body.id,
            { date, type, quantity, status },
            { new: true }
        );
        if (!updatedCart) return res.status(404).json({ message: "cart not found" });
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a cart
exports.deleteCart = async (req, res) => {
    try {
        const deletedCart = await cart.findByIdAndDelete(req.body.id);
        if (!deletedCart) return res.status(404).json({ message: "cart not found" });
        res.status(200).json({ message: "cart deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};