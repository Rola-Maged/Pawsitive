
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const shopSchema = new Schema({
    name: {
        type: String
    },
    address: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    phone: {
        type: Number
    },
    taxRegister: {
        type: String
    },
    offerings: {
        type: String
    },
});

const shop = mongoose.model("shop", shopSchema);

const validate = (shop) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        address: Joi.string().required(),
        phone: Joi.number().required(),
        taxRegister: Joi.string().required(),
        offerings: Joi.string().required(),
    });
    return schema.validate(shop);
};

module.exports = { shop, validate };

