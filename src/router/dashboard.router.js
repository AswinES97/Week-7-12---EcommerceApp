const dashboardRouter = require('express').Router()
const { httpGetDashboardPage,httpUserDetails } = require('../controller/dashboard.controller')


dashboardRouter.route('/')
    .get(httpGetDashboardPage)

dashboardRouter.route('/user-details')
    .get(httpUserDetails)

module.exports = dashboardRouter