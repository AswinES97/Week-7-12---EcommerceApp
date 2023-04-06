const { 
    httpNewOrder, 
    httpOrderPage,
} = require('../controller/order.controller')

const orderRouter = require('express').Router()

orderRouter.route('/')
    .get(httpOrderPage)
    .post(httpNewOrder)

module.exports = orderRouter