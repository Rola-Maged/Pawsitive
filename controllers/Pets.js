const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const {pet, petValidate}  = require("../models/pet")
const { ObjectId } = require('mongodb')
const {user} = require("../models/user")




// Create a new pet
exports.createPet = async(req,res)=>{
    const { name, ownershipCertificate, gender, breed, age, type, vaccination, user } = req.body;
    const { error } = petValidate({ name, ownershipCertificate, gender, breed, age, type, vaccination, user });
    if (error) return res.status(400).send(error.details[0].message);

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


    const existingUser = await pet.findOne({ ownershipCertificate });

    if (existingUser) {
      return res.status(400).json({ message: " Ownership Certificate Already Exists" });
    };

    await newPet.save();
    res.json(newPet);


};
 


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
        const singlePet = await pet.findById(req.params.id);
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
        const updatedPet = await pet.findByIdAndUpdate(
            req.params.id,
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
        const deletedPet = await pet.findByIdAndDelete(req.params.id);
        if (!deletedPet) return res.status(404).json({ message: "Pet not found" });
        res.status(200).json({ message: "Pet deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};