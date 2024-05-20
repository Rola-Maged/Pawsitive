const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const order  = require("../models/order")
const user  = require("../models/user")
const { ObjectId } = require('mongodb')




// Create a new order
exports.newOrder = async(req,res)=>{
    const { date, type, quantity, status, user} = req.body;
    const createOrder = new order({
        date,
        type,
        quantity,
        status,
        user,
      });
  
      await createOrder.save();

      res.json(createOrder)

}


// Get all orders
exports.getOrders = async (req, res) => {
    try {
        const allOrders = await order.find();
        res.status(200).json(allOrders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get an order by ID
exports.getOrderById = async (req, res) => {
    try {
        const singleOrder = await order.findById(req.body.id);
        if (!singleOrder) return res.status(404).json({ message: "order not found" });
        res.status(200).json(singleOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an order
exports.updateOrder = async (req, res) => {
    const { date, type, quantity, status, user} = req.body;
    try {
        const updatedOrder = await order.findByIdAndUpdate(
            req.body.id,
            { date, type, quantity, status, user},
            { new: true }
        );
        if (!updatedOrder) return res.status(404).json({ message: "order not found" });
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a product
exports.deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await order.findByIdAndDelete(req.body.id);
        if (!deletedOrder) return res.status(404).json({ message: "order not found" });
        res.status(200).json({ message: "order deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};