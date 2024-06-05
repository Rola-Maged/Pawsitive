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
    address: {
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
        type: String,
        // array: import from roles.json,
        
 required:true
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
        name: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string(),
        gender: Joi.string(),
        address: Joi.string(),
        phone: Joi.number(),
        taxRegister: Joi.string(),
        offerings: Joi.string(),
        syndicateCard: Joi.string(),
        role: Joi.string(),
    });
    return schema.userValidate(user);
};

userSchema.plugin(passportLocalMongoose);

module.exports = {user, userValidate}
