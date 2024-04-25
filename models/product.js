const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
});

const product = mongoose.model("product", productSchema);

const validate = (product) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        code: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        quantity: Joi.number().required(),
        type: Joi.string().required(),
    });
    return schema.validate(product);
};

module.exports = { product, validate };