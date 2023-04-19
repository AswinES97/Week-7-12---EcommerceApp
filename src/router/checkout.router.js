const checkoutRouter = require('express').Router()
const { 
    httpCheckoutPage,
    httpPlaceOrder,
    httpRazorpayVerify
} = require('../controller/checkout.controller')


checkoutRouter.route('/')
    .get(httpCheckoutPage)
    .post(httpPlaceOrder)

checkoutRouter.route('/verify-payment')
    .post(httpRazorpayVerify)

module.exports = checkoutRouter