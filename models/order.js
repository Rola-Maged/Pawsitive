const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");
const { ObjectId } = require("mongodb");

const orderSchema = new Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    type: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    user: {
        type: ObjectId,
        ref: "user",
        required : true
 
    },
});

const order = mongoose.model("order", orderSchema);

const validate = (order) => {
    const schema = Joi.object({
        date: Joi.date().required(),
        type: Joi.string().required(),
        quantity: Joi.number().required(),
        status: Joi.string().required(),
    });
    return schema.validate(order);
};

module.exports = { order, validate };