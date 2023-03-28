const { 
    httpUserCart, 
    httpAddToCart,
 } = require('./cart.controller')

const userCart = require('express').Router()

userCart.route('/')
    .get(httpUserCart)
    .post(httpAddToCart)

module.exports = userCart