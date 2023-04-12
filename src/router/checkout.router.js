const checkoutRouter = require('express').Router()
const { 
    httpCheckoutPage,
    httpPlaceOrder
} = require('../controller/checkout.controller')


checkoutRouter.route('/')
    .get(httpCheckoutPage)
    .post(httpPlaceOrder)

module.exports = checkoutRouter