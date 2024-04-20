const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const vetSchema = new Schema({
    username: {
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

const vet = mongoose.model("Vet", vetSchema);

const validate = (vet) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        address: Joi.string().required(),
        phone: Joi.number().required(),
        syndicateCard: Joi.string().required(),
    });
    return schema.validate(vet);
};

module.exports = { vet, validate };

