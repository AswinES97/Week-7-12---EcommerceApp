
const { 
    httpUserCart, 
    httpAddToCart,
    httpRemoveFromCart,
    httpDeleteAllProducts,
    httpUpdateProductInCart,
 } = require('./cart.controller')

const userCartRouter = require('express').Router()

userCartRouter.route('/')
    .get(httpUserCart)
    .post(httpAddToCart)
    .put(httpRemoveFromCart)
    .patch(httpUpdateProductInCart)
    .delete(httpDeleteAllProducts)

module.exports = userCartRouter