const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price_range: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
})

const product = mongoose.model('product', productSchema)

module.exports = product;