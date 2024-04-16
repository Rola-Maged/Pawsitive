const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const bookingSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
     
    
});

const booking = mongoose.model("booking", bookingSchema);

const validate = (booking) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    return schema.validate(booking);
};

module.exports = { booking, validate };