const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    minPurchase: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    expirationDate: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
