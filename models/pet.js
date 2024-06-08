const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");
const { ObjectId } = require('mongodb');
const { user } = require("./user");
 

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
 
    },
     
});

const pet = mongoose.model("pet", petSchema);

 
    const petJoischema = Joi.object({
        name: Joi.string().required(),
        ownershipCertificate: Joi.string().required(),
        gender: Joi.string().required(),
        age: Joi.number().required(),
        breed: Joi.string().required(),
        type: Joi.string().required(),
        vaccination: Joi.number().required(),
    });
    const petValidate  = (pet) => {
    return petJoischema.validate(pet);
};

module.exports = { pet, petValidate };


