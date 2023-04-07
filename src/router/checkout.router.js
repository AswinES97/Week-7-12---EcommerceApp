const { 
    httpNewOrder, 
    httpCheckoutPage,
} = require('../controller/checkout.controller')

const orderRouter = require('express').Router()

orderRouter.route('/')
    .get(httpCheckoutPage)
    .post(httpNewOrder)

module.exports = orderRouter