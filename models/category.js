const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const categorySchema = new Schema({
    name: {
        type: String
    },
    typeName: ["food", "accessory", "chip"],
});




module.exports = mongoose.model("category", categorySchema)
