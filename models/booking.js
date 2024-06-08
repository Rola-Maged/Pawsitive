const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");
const { ObjectId } = require('mongodb');

const bookingSchema = new Schema({
    date: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
    },
    verificationNumber: {
        type: Number,
    },
    user: {
        type: ObjectId,
        ref: "user",
        required : true
 
    },
    vet: {
        type: ObjectId,
        ref: "vet",
        required : true
 
    }, 
     
    
});

const booking = mongoose.model("booking", bookingSchema);

    const bookingJoischema = Joi.object({
        status: Joi.string().required(),
        verificationNumber: Joi.number().required(),
        user: Joi.string().required(),
        vet: Joi.string().required(),
    });
    const BookingValidate  = (booking) => {
        return bookingJoischema.validate(booking);
};

module.exports = { booking, BookingValidate };
