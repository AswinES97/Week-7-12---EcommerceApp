
const { 
    httpUserCart, 
    httpAddToCart,
    httpRemoveFromCart,
    httpDeleteAllProducts,
    httpUpdateProductInCart,
 } = require('./cart.controller')

const userCart = require('express').Router()

userCart.route('/')
    .get(httpUserCart)
    .post(httpAddToCart)
    .put(httpRemoveFromCart)
    .patch(httpUpdateProductInCart)
    .delete(httpDeleteAllProducts)

module.exports = userCart