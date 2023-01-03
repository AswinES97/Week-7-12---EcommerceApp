const express = require('express')
const { 
    httpLoginUser, 
    loadUserLoginpage, 
    httpAddNewUser 
} = require('./user.controller')
const userRouter = express.Router()


userRouter.route('/login')
    .get(loadUserLoginpage)
    .post(httpLoginUser)


userRouter.route('/add-user')
    .post(httpAddNewUser)


module.exports = {
    userRouter
}