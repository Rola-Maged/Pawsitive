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
    type: {
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
    subscription: {
        type: String,
    },
    color: {
        type: String,

    },
    gender: {
        type: String,

    },
    breed: {
        type: String,
    },
    age: {
        type: Number,
    },
    material: {
        type: String,
    },
    category: {
        type: ObjectId,
        ref: "category",
 
    },
    sustainable: {
        type: Boolean,
        required: true,
    },
    img:
    {
        data: Buffer,
        contentType: String
    }
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
        subscription: Joi.string().required(),
        gender: Joi.string().required(),
        age: Joi.number().required(),
        breed: Joi.string().required(),
        material: Joi.string().required(),
        category: Joi.string().required(),
        sustainable: Joi.boolean().required(),
        
    });
    const productValidate = (product) => {
        return productJoischema.validate(product);
};


module.exports = { product, productValidate };