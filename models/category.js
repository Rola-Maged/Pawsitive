const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const categorySchema = new Schema({
    name: {
        type: String
    },
    typeName: ["food", "accessory", "chip"],
});

const category = mongoose.model("category", categorySchema);

 
    const categoryJoischema = Joi.object({
        name: Joi.string().required(),
        typeName: Joi.string().required(),
         
    });
     
    const categoryValidate = (category) => {
      return categoryJoischema.validate(category);
};

module.exports = { category, categoryValidate };

