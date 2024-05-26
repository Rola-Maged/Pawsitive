const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    gender: {
        type: String
    },
    age: {
        type: Number
    },
    adress: {
        type: String
    },
    phone:{
        type: Number
    },
    role: {
        type: ObjectId,
        ref: "role",
        required : true
 
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

const user = mongoose.model("user", userSchema)

const validate = (user) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        gender: Joi.string().required(),
        age: Joi.number().required(),
        adress: Joi.string().required(),
        phone: Joi.number().required(),
    });
    return schema.validate(user);
};

module.exports = {user, validate}
