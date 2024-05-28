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
    taxRegister: {
        type: String
    },
    offerings: {
        type: String
    },
    syndicateCard: {
        type: String
    },
    role: {
        type: String
       // enum: [roles.json]
        // array: import from roles.json,
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

const userValidate = (user) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        gender: Joi.string().required(),
        age: Joi.number().required(),
        adress: Joi.string().required(),
        phone: Joi.number().required(),
        taxRegister: Joi.string(),
        offerings: Joi.string(),
        syndicateCard: Joi.string(),
        role: Joi.string().required(),
    });
    return schema.userValidate(user);
};

userSchema.plugin(passportLocalMongoose);

module.exports = {user, userValidate}
