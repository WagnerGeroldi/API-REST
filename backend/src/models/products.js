const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: String,
    brand: String,
    price: Number,
})

const Model = mongoose.model('products', schema) // criar modelo do schema no mongo

module.exports = Model