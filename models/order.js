const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");
const { ObjectId } = require("mongodb");
const productSchema = require("./product");

const orderSchema = new Schema({
    date: {
        type: Date,
        default: Date.now,
    },
    type: {
        type: String,
    },
    quantity: {
        type: String,

    },
    status: {
        type: String,
    },
    user: {
        type: ObjectId,
        ref: "user",
 
    },
    products : [{ type: Schema.Types.ObjectId, ref: 'product' }]
});

const order = mongoose.model("order", orderSchema);

    const orderJoischema = Joi.object({
        type: Joi.string().required(),
        quantity: Joi.number().required(),
        status: Joi.string().required(),
        product: Joi.string().required(),
    });
    const orderValidate = (order) => {
        return orderJoischema.validate(order);
};

module.exports = { order, orderValidate };