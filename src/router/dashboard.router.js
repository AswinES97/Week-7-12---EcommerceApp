const dashboardRouter = require('express').Router()
const { httpGetDashboardPage, httpUserDetails, httpSingleOrderDetails, httpCancelOrder } = require('../controller/dashboard.controller')
const { httpOrderReturn } = require('../controller/order.controller')


dashboardRouter.route('/')
    .get(httpGetDashboardPage)

dashboardRouter.route('/user-details')
    .get(httpUserDetails)

dashboardRouter.route('/single-order')
    .get(httpSingleOrderDetails)
    .put(httpCancelOrder)

dashboardRouter.route('/order-return')
    .post(httpOrderReturn)

module.exports = dashboardRouter