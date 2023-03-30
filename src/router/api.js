const express = require('express')
// const { userLoggedIn } = require('../services/session')
const { adminRouter } = require('./admin/admin.router')
const productRouter = require('./product/product.router')
const { userRouter } = require('./users/users.router')
const api = express()

api.use('/users',userRouter)
api.use('/admin',adminRouter)
api.use('/product',productRouter)

module.exports = api