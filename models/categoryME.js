const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'chip', ref: 'acessories', ref: 'food' }]
});

const category = mongoose.model('category', categorySchema);

module.exports = { category};