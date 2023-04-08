const orderRouter = require('express').Router()
const { 
    httpNewOrder, 
    httpCheckoutPage,
} = require('../controller/checkout.controller')


orderRouter.route('/')
    .get(httpCheckoutPage)
    .post(httpNewOrder)

module.exports = orderRouter