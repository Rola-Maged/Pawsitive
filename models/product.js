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
        required : true,
 
    },

    
});

const product = mongoose.model("product", productSchema);

const productValidate = (product) => {
    const schema = Joi.object({
        name: Joi.string(),
        code: Joi.number(),
        details: Joi.string(),
        price: Joi.number(),
        quantity: Joi.number(),
        rating: Joi.number(),
        review: Joi.string(),
        type: Joi.string(),
        image: Joi.string(),
        color: Joi.string(),
        subscription: Joi.string(),
        gender: Joi.string(),
        age: Joi.number(),
        breed: Joi.string(),
        material: Joi.string(),
        
    });
    return schema.productValidate(product);
};


module.exports = { product, productValidate };