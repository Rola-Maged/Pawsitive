const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");
const { ObjectId } = require('mongodb');

const bookingSchema = new Schema({
    date: {
        type: Date,
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

const validate = (booking) => {
    const schema = Joi.object({
        date: Joi.date().required(),
        status: Joi.string().required(),
        verificationNumber: Joi.number().required(),
    });
    return schema.validate(booking);
};

module.exports = { booking, validate };
