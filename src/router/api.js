const express = require('express')
const { adminRouter } = require('./admin/admin.router')
const { userRouter } = require('./users/users.router')
const api = express()

api.get('/',(req,res)=>{
    res.status(200).json({'hi':'Welcome!'})
})
api.use('/users',userRouter)
api.use('/admin',adminRouter)

module.exports = api