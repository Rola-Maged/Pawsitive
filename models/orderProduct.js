/*
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");
const { ObjectId } = require("mongodb");

const orderProductSchema = new Schema({
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    order: {
        type: ObjectId,
        ref: "order",
        required : true
 
    },
    product: {
        type: ObjectId,
        ref: "product",
        required : true
 
    },
});

const orderProduct = mongoose.model("orderProduct", orderProductSchema);

const validate = (orderProduct) => {
    const schema = Joi.object({
        quantity: Joi.number().required(),
        price: Joi.number().required(),
        date: Joi.date().required(),
    });
    return schema.validate(orderProduct);
};

module.exports = { orderProduct, validate };
*/