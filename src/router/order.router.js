const { httpGetOrderPage,
        httpGetAllOrderDetails,
} = require('../controller/order.controller')

const orderRouter = require('express').Router()

orderRouter.route('/')
        .get(httpGetOrderPage)

orderRouter.route('/dash')
        .get(httpGetAllOrderDetails)


module.exports = orderRouter