const express = require('express')
const { httpGetAdminDetails } = require('./admin.controller')
const adminRouter = express.Router()

adminRouter.route('/admin-login')
    .post(httpGetAdminDetails)



module.exports = {
    adminRouter
}