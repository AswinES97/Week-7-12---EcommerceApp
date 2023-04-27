const { httpGetWishlistPage, httpAddToWishlist, httpRemoveFromWishlist } = require('../controller/wishlist.controller')

const wishlishtRouter = require('express').Router()

wishlishtRouter.route('/')
    .get(httpGetWishlistPage)
    .post(httpAddToWishlist)
    .put(httpRemoveFromWishlist)

module.exports = wishlishtRouter