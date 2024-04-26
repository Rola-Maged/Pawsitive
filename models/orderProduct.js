const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const orderProductSchema = new Schema({
    quantity: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
});

const orderProduct = mongoose.model("orderProduct", orderProductSchema);

const validate = (orderProduct) => {
    const schema = Joi.object({
        quantity: Joi.string().required(),
        price: Joi.number().required(),
        date: Joi.date().required(),
    });
    return schema.validate(orderProduct);
};

module.exports = { orderProduct, validate };