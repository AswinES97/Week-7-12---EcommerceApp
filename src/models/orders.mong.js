const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    orderId: {
        type: Number,
        required: true,
        unique: true
    },
    orderStatus: {
        type: String,
        default: 'pending'
    },
    userId: {
        type: String,
        required: true
    },
    products: [{
        pId: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        size: {
            type: String,
            required: true
        },
        boughtPrice: {
            type: Number,
            required: true
        }
    }],
    shippingAddress: {
        addressId: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        address1: {
            type: String,
            required: true
        },
        address2: String,
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        postal_code: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }

    },
    paymentMethod: {
        type: String,
        required: true
    },
    payment_status: {
        type: String,
        default: 'pending'
    },
    paymentResult: {
        id: {
            type: String
        },
        update_time: {
            type: Date
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
        default: false
    },
    deliveredAt: {
        type: Date
    },
    cancelReason: {
        type: String
    },
    returnReson: {
        type: String
    }
}, { timestamps: true, versionKey: false }
)

module.exports = mongoose.model('Order', OrderSchema);