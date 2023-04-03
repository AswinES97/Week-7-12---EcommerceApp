const { 
    httpNewOrder, 
    httpOrderPage,
} = require('./order.controller')

const orderRouter = require('express').Router()

orderRouter.route('/')
    .get(httpOrderPage)
    .post(httpNewOrder)

module.exports = orderRouter