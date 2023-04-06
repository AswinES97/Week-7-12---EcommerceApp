const { httpGetDashboardPage } = require('../controller/dashboard.controller')

const dashboardRouter = require('express').Router()

dashboardRouter.route('/')
    .get(httpGetDashboardPage)

module.exports = dashboardRouter