 /*
 
 // routes/cartRoutes.js
 const express = require('express');
 const router = express.Router();
 const Cart = require('../models/cart');

 // Get cart by user ID
 router.get('/:userId', async (req, res) => {
   try {
     const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
     res.json(cart);
   } catch (err) {
     res.status(500).json({ message: err.message });
   }
 });

 // Update cart
 router.patch('/:userId', async (req, res) => {
   try {
     const cart = await Cart.findOneAndUpdate(
       { userId: req.params.userId },
       { $set: { items: req.body.items } },
       { new: true }
     ).populate('items.productId');
     res.json(cart);
   } catch (err) {
     res.status(400).json({ message: err.message });
   }
 });

 module.exports = router;
 */