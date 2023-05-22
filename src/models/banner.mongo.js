const mongoose = require('mongoose')

const BannerSchema = new mongoose.Schema({
    text1: {
        type: String,
        required: true
    },
    text2: {
        type: String,
        required: true
    },
    text3: {
        type: String,
        required: true
    },
    text4: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    isActive:{
        type: Boolean,
        required: true,
        default: true
    }
}, { versionKey: false })

module.exports = mongoose.model('banner',BannerSchema)