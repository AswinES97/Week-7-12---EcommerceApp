const express = require('express')
// const { userLoggedIn } = require('../services/session')
const { adminRouter } = require('./admin.router')
const { userRouter } = require('./users.router')
const productRouter = require('./product.router')
const api = express()

api.use('/users',userRouter)
api.use('/admin',adminRouter)
api.use('/product',productRouter)

module.exports = api