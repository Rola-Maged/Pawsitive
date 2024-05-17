const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const categorySchema = new Schema({
    name: {
        type: String
    },
    type: {
        type: String
    },
});




module.exports = mongoose.model("category", categorySchema)
