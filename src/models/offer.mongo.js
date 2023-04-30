const mongoose = require('mongoose')

const OfferSchema = new mongoose.Schema({
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
        default: true,
    },
    offerpercentage: {
        type: Number,
        default: 0,
        required: true
    },
}, { versionKey: false })

module.exports = mongoose.model('offer', OfferSchema)