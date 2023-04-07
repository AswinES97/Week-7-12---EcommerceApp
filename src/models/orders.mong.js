const mongoose = require('mongoose')
const ObjectId = mongoose.ObjectId

const OrderSchema = new mongoose.Schema({
    customer: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        product: {
            type: ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        size:{
            type: string,
            required: true
        },
        boughtPrice:{

        }
    }],
    shippingAddress: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentResult: {
        id: {
            type: String
        },
        status: {
            type: String
        },
        update_time: {
            type: String
        },
        email_address: {
            type: String
        }
    },
    totalPrice: {
        type: Number,
        required: true
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt: {
        type: Date
    }
}, { timestamps: true }
)

module.exports = mongoose.model('Order', OrderSchema);