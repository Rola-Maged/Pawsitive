const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");
const { ObjectId } = require('mongodb');

const petSchema = new Schema({
    name: {
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
    user: {
        type: ObjectId,
        ref: "user",
        required : true
 
    },
     
});

const pet = mongoose.model("pet", petSchema);

const petValidate  = (pet) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        ownershipCertificate: Joi.string().required(),
        gender: Joi.number().required(),
        age: Joi.string().required(),
        breed: Joi.string().required(),
        type: Joi.string().required(),
        vaccination: Joi.string().required(),
    });
    return schema.petValidate(pet);
};

module.exports = { pet, petValidate };


