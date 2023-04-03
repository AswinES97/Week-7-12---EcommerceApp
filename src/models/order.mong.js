const mongoose = require('mongoose');
const ObjectId = mongoose.ObjectId

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    user: {
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
            min: 1
        },
        boughtPrice: {
            type: Number,
            required: true,
        }
    }],
    status: {
        type: String,
        enum: ['pending', 'paid', 'shipped', 'delivered'],
        default: 'pending'
    },
    shippingAddress: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['credit card', 'debit card', 'paypal','cod','razorpay'],
        required: true
    },
    paymentResult: {
        id: String,
        status: String,
        update_time: String,
        email_address: String
    },
    // taxPrice: {
    //     type: Number,
    //     required: true,
    //     default: 0.0
    // },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;