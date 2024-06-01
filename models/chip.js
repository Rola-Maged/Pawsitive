const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const chipSchema = new Schema({
    price: {
        type: Number
    },
    quantity: {
        type: Number
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
    rating: {
        type: String,

    },
    review: {
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
    category: {
        type: ObjectId,
        ref: "category",
        required : true
 
    },
 
});

const chip = mongoose.model("chip", chipSchema);

const validate = (chip) => {
    const schema = Joi.object({
        price: Joi.number().required(),
        quantity: Joi.number().required(),
        subscription: Joi.string().required(),
        details: Joi.string().required(),
        color: Joi.string().required(),
        rating: Joi.string().required(),
        review: Joi.string().required(),
        image: Joi.string().required(),
    });
    return schema.validate(chip);
};

module.exports = { chip, validate };
