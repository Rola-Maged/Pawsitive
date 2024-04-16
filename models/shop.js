const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const shopSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    taxRegister: {
        type: String,
        required: true,
    },
    offerings: {
        type: String,
        required: true,
    },
});

const shop = mongoose.model("shop", shopSchema);

const validate = (shop) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        address: Joi.string().required(),
        phone: Joi.string().required(),
        taxRegister: Joi.string().required(),
        offerings: Joi.string().required(),
    });
    return schema.validate(shop);
};

module.exports = { shop, validate };