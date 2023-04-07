const { 
    httpNewOrder, 
    httpCheckoutPage,
} = require('../controller/order.controller')

const orderRouter = require('express').Router()

orderRouter.route('/')
    .get(httpCheckoutPage)
    .post(httpNewOrder)

module.exports = orderRouter