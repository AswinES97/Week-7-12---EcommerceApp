const express = require('express')
const api = express()
const { adminRouter } = require('./admin.router')
const { userRouter } = require('./users.router')
const { userCheck } = require('../middleware/session')
const productRouter = require('./product.router')
const sortRouter = require('./sort.router')
const searchRouter = require('./search.router')

api.use('/users',userRouter)
api.use('/sort',sortRouter)
api.use('/admin',adminRouter)
api.use('/product',userCheck,productRouter)
api.use('/search',userCheck,searchRouter)

module.exports = api