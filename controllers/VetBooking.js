const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const {vet} = require("../models/vet")
const  {booking, BookingValidate}  = require("../models/booking")
const { ObjectId } = require('mongodb')
const router = express.Router();
const {user} = require('../models/user');


/*
// Create a new vet
exports.createVet = async(req,res)=>{
    const { name, password, address, email, phone, syndicateCard  } = req.body;
    const newVet = new vet({
        name,
        password,
        address,
        email,
        phone,
        syndicateCard,  
     });
      await newProduct.save();

       res.json(newProduct)

}

*/
// Get all vets
exports.getVets = async (req, res) => {
    try {
        const vets = await vet.find();
        res.status(200).json(vets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get a vet by ID
exports.getVetById = async (req, res) => {
    try {
        const singleVet = await vet.findById(req.params.id);
        if (!singleVet) return res.status(404).json({ message: "Vet not found" });
        res.status(200).json(singleVet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update a vet
exports.updateVet = async (req, res) => {
    const { name, password, address, email, phone, syndicateCard } = req.body;
    try {
        const updatedVet = await vet.findByIdAndUpdate(
            req.params.id,
            { name, password, address, email, phone, syndicateCard  },
            { new: true }
        );
        if (!updatedVet) return res.status(404).json({ message: "vet not found" });
        res.status(200).json(updatedVet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a vet
exports.deleteVet = async (req, res) => {
    try {
        const deletedVet = await vet.findByIdAndDelete(req.params.id);
        if (!deletedVet) return res.status(404).json({ message: "vet not found" });
        res.status(200).json({ message: "vet deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Create a new booking
exports.createBooking = async(req,res)=>{
    const { status, verificationNumber, vet } = req.body;

    var user = req.user;
    const { error } = BookingValidate({  status, verificationNumber, vet});
    if (error) return res.status(400).send(error.details[0].message);

    const newBooking = new booking({
        
        status,
        verificationNumber,
        vet,
         
    });
  
    const existingUser = await booking.findOne({  verificationNumber });

    if (existingUser) {
      return res.status(400).json({ message: " Verification Number Already used" });
    };

      await newBooking.save();

      res.json(newBooking)

}


// Get all bookings
exports.getBookings = async (req, res) => {
    try {
        const bookings = await booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a booking by ID
exports.getBookingById = async (req, res) => {
    try {
        const singleBooking = await booking.findById(req.params.id);
        if (!singleBooking) return res.status(404).json({ message: "bookikng not found" });
        res.status(200).json(singleBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a booking
exports.updateBooking = async (req, res) => {
    const { date, status, verificationNumber, vet, user } = req.body;
    BookingValidate()
    try {
        const updatedBooking = await booking.findByIdAndUpdate(
            req.params.id,
            { date, status, verificationNumber, vet, user },
            { new: true }
        );
        if (!updatedBooking) return res.status(404).json({ message: "booking not found" });
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
    try {
        const deletedBooking = await booking.findByIdAndDelete(req.params.id);
        if (!deletedBooking) return res.status(404).json({ message: "booking not found" });
        res.status(200).json({ message: "booking deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



