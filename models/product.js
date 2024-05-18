const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const productSchema = new Schema({
    name: {
        type: String,
    },
    code: {
        type: Number,
    },
    details: {
        type: String,
    },
    price: {
        type: String,
    },
    quantity: {
        type: String,
    },
    rating: {
        type: String,
    },
    review: {
        type: String,
    },
    type: {
        type: String,
    },
    image: {

        public_id: {
            type: String,
        },
 
        url: {
            type: String,
        }
 
    },
    subscription: {
        type: String
    },
    details: {
        type: String
    },
    color: {
        type: String
    },
    ownershipCertificate: {
        type: String
    },
    gender: {
        type: String
    },
    breed: {
        type: String
    },
    age: {
        type: Number
    },
    type: {
        type: String
    },
    vaccination: {
        type: Number
    },
     
    category: {
        type: ObjectId,
        ref: "category",
        required : true
 
    },
});

const product = mongoose.model("product", productSchema);

const validate = (product) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        code: Joi.string().required(),
        details: Joi.string().required(),
        price: Joi.number().required(),
        quantity: Joi.number().required(),
        rating: Joi.string().required(),
        review: Joi.string().required(),
        type: Joi.string().required(),
        image: Joi.string().required(),
        name: Joi.string().required(),
        ownershipCertificate: Joi.string().required(),
        gender: Joi.number().required(),
        age: Joi.string().required(),
        breed: Joi.string().required(),
        type: Joi.string().required(),
        vaccination: Joi.string().required(),
        
    });
    return schema.validate(product);
};

module.exports = { product, validate };