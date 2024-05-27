const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");
const passportLocalMongoose = require('passport-local-mongoose');

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
        type: String,
 
    },
   
   /* role: {
        type: ObjectId,
        ref: "role",
        required : true
 
    },

*/
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
        role: Joi.string().required(),
    });
    return schema.validate(user);
};

userSchema.plugin(passportLocalMongoose);

module.exports = {user, validate}
