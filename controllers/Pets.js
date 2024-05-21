const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const pet  = require("../models/pet")
const { ObjectId } = require('mongodb')




// Create a new pet
exports.createPet = async(req,res)=>{
    const { name, ownershipCertificate, gender, breed, age, type, vaccination, user } = req.body;
    const newPet = new pet({
        name,
         ownershipCertificate, 
         gender,
         breed, 
         age, 
          type,
         vaccination,
         user,
      });
  
      await newPet.save();

      res.json(newPet)

}


// Get all pets
exports.getPets = async (req, res) => {
    try {
        const pets = await pet.find();
        res.status(200).json(pets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a pet by ID
exports.getPetById = async (req, res) => {
    try {
        const singlePet = await pet.findById(req.body.id);
        if (!singlePet) return res.status(404).json({ message: "Pet not found" });
        res.status(200).json(singlePet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a pet
exports.updatepet = async (req, res) => {
    const { name, ownershipCertificate, gender, breed, age, type, vaccination, user } = req.body;
    try {
        const updatedPet = await product.findByIdAndUpdate(
            req.body.id,
            { name, ownershipCertificate, gender, breed, age, type, vaccination, user },
            { new: true }
        );
        if (!updatedPet) return res.status(404).json({ message: "Pet not found" });
        res.status(200).json(updatedPet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a pet
exports.deletePet = async (req, res) => {
    try {
        const deletedPet = await pet.findByIdAndDelete(req.body.id);
        if (!deletedPet) return res.status(404).json({ message: "Pet not found" });
        res.status(200).json({ message: "Pet deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};