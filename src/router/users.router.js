const express = require('express')
const userRouter = express.Router()
const {
    userLoggedIn, 
    userNotLoggedIn,
} = require('../services/session')
const {
    httpsentOtpToUser,
    httpOtpVerify,
    httpEmailVerify,
    httpAddNewUserVerifyOtp,
    httpUserHomepage,
    httpUserLogout,
    httpAddNewUserEmailOtp,
} = require('../controller/user.controller')
const userCartRouter = require('./cart.router')
const checkoutRouter = require('./checkout.router')
const dashboardRouter = require('./dashboard.router')
const addressRouter = require('./address.router')

userRouter.route('/login')
    .all(userNotLoggedIn)
    .post(httpsentOtpToUser)

userRouter.route('/login-otp')
    .all(userNotLoggedIn)
    .post(httpOtpVerify)

userRouter.route('/login-email')
    .all(userNotLoggedIn)
    .post(httpEmailVerify)

userRouter.route('/add-user')
    .all(userNotLoggedIn)
    .post(httpAddNewUserEmailOtp)

userRouter.route('/add-user-otp')
    .all(userNotLoggedIn)
    .post(httpAddNewUserVerifyOtp)

userRouter.route('/')
    .all(userLoggedIn)
    .get(httpUserHomepage)

userRouter.route('/logout')
    .all(userLoggedIn)
    .get(httpUserLogout)

userRouter.use('/cart',userLoggedIn,userCartRouter)
userRouter.use('/checkout',userLoggedIn,checkoutRouter)
userRouter.use('/dashboard',userLoggedIn,dashboardRouter)
userRouter.use('/address',userLoggedIn,addressRouter)

module.exports = {
    userRouter
}