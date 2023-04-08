const express = require('express')
const api = express()
const { adminRouter } = require('./admin.router')
const { userRouter } = require('./users.router')
const productRouter = require('./product.router')

api.use('/users',userRouter)
api.use('/admin',adminRouter)
api.use('/product',productRouter)

module.exports = api