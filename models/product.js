const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");
const { ObjectId } = require("mongodb");

const productSchema = new Schema({
    name: {
        type: String,
        required: false,
    },
    code: {
        type: Number,
        required: false,
    },
    details: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: false,
    },
    quantity: {
        type: Number,
        required: false,
    },
    rating: {
        type: Number,
        required: false,
    },
    review: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: false,
    },
    image: {

        public_id: {
            type: String,
            required: false,
        },
 
        url: {
            type: String,
            required: false,
        }
 
    },
    subscription: {
        type: String,
        required: false,
    },
    color: {
        type: String,
        required: false,

    },
    gender: {
        type: String,
        required: false,

    },
    breed: {
        type: String,
        required: false,
    },
    age: {
        type: Number,
        required: false,
    },
    material: {
        type: String,
        required: false,
    },
    category: {
        type: ObjectId,
        ref: "category",
        required : false,
 
    },

    
});

const product = mongoose.model("product", productSchema);
/*
const validate = (product) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        code: Joi.number().required(),
        details: Joi.string().required(),
        price: Joi.number().required(),
        quantity: Joi.number().required(),
        rating: Joi.number().required(),
        review: Joi.string().required(),
        type: Joi.string().required(),
        image: Joi.string().required(),
        color: Joi.string().required(),
        subscription: Joi.string().required(),
        gender: Joi.string().required(),
        age: Joi.number().required(),
        breed: Joi.string().required(),
        material: Joi.string().required(),
        
    });
    return schema.validate(product);
};
*/

module.exports = { product };