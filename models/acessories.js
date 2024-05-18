/* const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const acessoriesSchema = new Schema({
    name: {
        type: String,
    },
    code: {
        type: Number,
    },
    details: {
        type: String,
    },
    price: {
        type: String,

    },
    quantity: {
        type: String,
    },
    rating: {
        type: String,

    },
    review: {
        type: String,
    },
    type: {
        type: String,
    },
    image: {

        public_id: {
            type: String,
        },
 
        url: {
            type: String,
        }
 
    },
    category: {
        type: ObjectId,
        ref: "category",
        required : true
 
    },
});

const acessories = mongoose.model("acessories", foodSchema);

const validate = (acessories) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        code: Joi.string().required(),
        details: Joi.string().required(),
        price: Joi.number().required(),
        quantity: Joi.number().required(),
        rating: Joi.string().required(),
        review: Joi.string().required(),
        type: Joi.string().required(),
        image: Joi.string().required(),
    });
    return schema.validate(acessories);
};

module.exports = { acessories, validate };
*/ 
