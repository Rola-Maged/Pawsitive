const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");
const { ObjectId } = require("mongodb");

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
        type: Number,
    },
    quantity: {
        type: Number,

    },
    rating: {
        type: Number,
    },
    review: {
        type: String,
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
    color: {
        type: String,

    },
    material: {
        type: String,
    },
    category: {
        type: ObjectId,
        ref: "category",
        required : true,
 
    },
    sustainable: {
        type: Boolean,
        required: true,
    },
});

const product = mongoose.model("product", productSchema);

    const productJoischema = Joi.object({
        name: Joi.string().required(),
        code: Joi.number().required(),
        details: Joi.string().required(),
        price: Joi.number().required(),
        quantity: Joi.number().required(),
        rating: Joi.number().required(),
        review: Joi.string().required(),
        image: Joi.string().required(),
        color: Joi.string().required(),
        material: Joi.string().required(),
        category: Joi.string().required(),
        sustainable: Joi.boolean().required(),
        
    });
    const productValidate = (product) => {
        return productJoischema.validate(product);
};


module.exports = { product, productValidate };