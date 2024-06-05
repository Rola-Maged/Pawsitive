const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const {chip}  = require("../models/chip")
const { ObjectId } = require('mongodb')




// Create a new chip
exports.createChip = async(req,res)=>{
    const { subscription, details, color } = req.body;
    const newChip = new chip({
        subscription, 
        details,
        color,
      });
  
      await newChip.save();

      res.json(newChip)

}


// Get all chips
exports.getChip = async (req, res) => {
    try {
        const Chips = await chip.find();
        res.status(200).json(Chips);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a cart by ID
exports.getChipById = async (req, res) => {
    try {
        const singleChip = await chip.findById(req.params.id);
        if (!singleChip) return res.status(404).json({ message: "chip not found" });
        res.status(200).json(singleChip);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a chip
exports.updateChip = async (req, res) => {
    const { subscription, details, color  } = req.body;
    try {
        const updateChip = await chip.findByIdAndUpdate(
            req.params.id,
            { subscription, details, color  },
            { new: true }
        );
        if (!updateChip) return res.status(404).json({ message: "chip not found" });
        res.status(200).json(updateChip);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a chip
exports.deleteChip = async (req, res) => {
    try {
        const deletedChip = await chip.findByIdAndDelete(req.params.id);
        if (!deletedChip) return res.status(404).json({ message: "chip not found" });
        res.status(200).json({ message: "chip deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};