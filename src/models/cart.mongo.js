const mongoose = require('mongoose')
const ObjectId = mongoose.ObjectId

const cartSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        required: true
    },
    product: [
        {
            pId: {
                type: ObjectId,
                ref:'Product',
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