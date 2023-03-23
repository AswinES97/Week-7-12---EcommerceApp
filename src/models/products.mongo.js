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
    description:{
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
    subcategory: {
        type: String,
        required: true
    },
    categoryType:{
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
    },
    image:[{
        type: String,
        required: true
    }],
    quantity: {
        size: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        quantity:{
            type: Number,
            required: true
        }
    }
},{versionKey:false})

module.exports = mongoose.model('Product', productSchema)