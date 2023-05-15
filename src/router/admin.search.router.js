const { httpAdminSearchController } = require('../controller/admin.search.controller')

const adminSearchRouter = require('express').Router()

adminSearchRouter.route('/')
    .get(httpAdminSearchController)

module.exports = adminSearchRouter