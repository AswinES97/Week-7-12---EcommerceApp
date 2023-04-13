const express = require('express')
const api = express()
const { adminRouter } = require('./admin.router')
const { userRouter } = require('./users.router')
const productRouter = require('./product.router')
const { productUserCheck } = require('../middleware/session')

api.use('/users',userRouter)
api.use('/admin',adminRouter)
api.use('/product',productUserCheck,productRouter)

module.exports = api