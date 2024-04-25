const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const vetSchema = new Schema({
    name: {
        type: String
    },
    password: {
        type: String
    },
    address: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    syndicateCard: {
        type: String
    },
     
});

const vet = mongoose.model("vet", vetSchema);

const validate = (vet) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        address: Joi.string().required(),
        phone: Joi.number().required(),
        syndicateCard: Joi.string().required(),
    });
    return schema.validate(vet);
};

module.exports = { vet, validate };

