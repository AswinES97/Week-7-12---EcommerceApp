const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    product: [
        {
            pId: {
                type: String,
                required: true
            },
            size:{
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            subTotal: {
                type: Number,
                required: true
            }
        }
    ],
    grandTotal: {
        type: Number,
        required: true
    }
}, { versionKey: false })

module.exports = mongoose.model('cart', cartSchema)