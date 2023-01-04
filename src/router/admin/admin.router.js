const express = require('express')
const { 
    httpGetAdminDetails,
    httpGetAllUsers
} = require('./admin.controller')
const productsRouter = require('./admin.products.router')

const adminRouter = express.Router()

adminRouter.route('/admin-login')
    .post(httpGetAdminDetails)

adminRouter.route('/users')
    .get(httpGetAllUsers)

adminRouter.use('/products',productsRouter)

module.exports = {
    adminRouter
}