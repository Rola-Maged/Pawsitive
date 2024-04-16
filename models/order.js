const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const orderSchema = new Schema({
    date: {
        type: String,
        required: true,
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
});

const order = mongoose.model("order", orderSchema);

const validate = (order) => {
    const schema = Joi.object({
        date: Joi.string().required(),
        type: Joi.string().required(),
        quantity: Joi.number().required(),
        status: Joi.string().required(),
    });
    return schema.validate(order);
};

module.exports = { order, validate };