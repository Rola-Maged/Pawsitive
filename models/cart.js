const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const cartSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
     
});

const cart = mongoose.model("cart", cartSchema);

const validate = (cart) => {
    const schema = Joi.object({
        date: Joi.date().required(),
        type: Joi.string().required(),
        quantity: Joi.number().required(),
        status: Joi.string().required(),
    });
    return schema.validate(cart);
};

module.exports = { cart, validate };



var ItemSchema = new Schema({
    product_id: {
      type: String,
      required: true
    },
    qty: {
      type: Number,
      required: true,
      min: [1, 'Quantity can not be less then 1.']
    }
  });
  const CartSchema = new Schema({
    email: {
      type: String,
      required: true,
      match: [
        /[\w]+?@[\w]+?\.[a-z]{2,4}/,
        'The value of path {PATH} ({VALUE}) is not a valid email address.'
      ]
    },
    items: [ItemSchema],
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
 

  const mongoose = require('mongoose');

  const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, default: 1 }
    }]
  });

  module.exports = mongoose.model('cart', cartSchema);
 