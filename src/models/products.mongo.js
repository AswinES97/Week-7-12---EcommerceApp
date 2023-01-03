const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: [{
        size: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        }
    }]
})

module.exports = mongoose.model('Product', productSchema)