const dashboardRouter = require('express').Router()
const { httpGetDashboardPage } = require('../controller/dashboard.controller')


dashboardRouter.route('/')
    .get(httpGetDashboardPage)

module.exports = dashboardRouter