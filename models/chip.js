const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const chipSchema = new Schema({
    price: {
        type: Number
    },
    quantity: {
        type: Number
    },
    subscription: {
        type: String
    },
     
});

const chip = mongoose.model("chip", chipSchema);

const validate = (chip) => {
    const schema = Joi.object({
        price: Joi.number().required(),
        quantity: Joi.number().required(),
        subscription: Joi.string().required(),
    });
    return schema.validate(chip);
};

module.exports = { chip, validate };
