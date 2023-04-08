const userCartRouter = require('express').Router()
const { 
    httpUserCart, 
    httpAddToCart,
    httpRemoveFromCart,
    httpDeleteAllProducts,
    httpUpdateProductInCart,
 } = require('../controller/cart.controller')


userCartRouter.route('/')
    .get(httpUserCart)
    .post(httpAddToCart)
    .put(httpRemoveFromCart)
    .patch(httpUpdateProductInCart)
    .delete(httpDeleteAllProducts)

module.exports = userCartRouter