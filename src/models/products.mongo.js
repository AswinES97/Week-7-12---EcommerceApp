const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    pId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    offerprice: {
        type: Number,
        default: 0
    },
    offerpercentage: {
        type: Number,
        default: 0
    },
    brand: {
        type: String,
        required: true
    },
    description: {
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
    categoryType: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
    },
    image: [{
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
        quantity: {
            type: Number,
            required: true
        }
    }
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('Product', productSchema)