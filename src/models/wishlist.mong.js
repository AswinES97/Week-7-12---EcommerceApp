const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    products: Array
},{versionKey:false})

module.exports = mongoose.model('wishlist',wishlistSchema)