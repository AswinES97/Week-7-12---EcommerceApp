const express = require('express')
const api = express()
const { adminRouter } = require('./admin.router')
const { userRouter } = require('./users.router')
const { productUserCheck } = require('../middleware/session')
const productRouter = require('./product.router')
const sortRouter = require('./sort.router')

api.use('/users',userRouter)
api.use('/sort',sortRouter)
api.use('/admin',adminRouter)
api.use('/product',productUserCheck,productRouter)

module.exports = api