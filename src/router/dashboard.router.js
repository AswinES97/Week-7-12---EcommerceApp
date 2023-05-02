const dashboardRouter = require('express').Router()
const { httpGetDashboardPage, httpUserDetails, httpSingleOrderDetails, httpCancelOrder } = require('../controller/dashboard.controller')


dashboardRouter.route('/')
    .get(httpGetDashboardPage)

dashboardRouter.route('/user-details')
    .get(httpUserDetails)

dashboardRouter.route('/single-order')
    .get(httpSingleOrderDetails)
    .put(httpCancelOrder)

module.exports = dashboardRouter