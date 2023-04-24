const userRouter = require('express').Router()
const {
    userLoggedIn,
    userNotLoggedIn,
} = require('../middleware/session')
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
const orderRouter = require('./order.router.js')

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

userRouter.use('/cart', userLoggedIn, userCartRouter)
userRouter.use('/dashboard', userLoggedIn, dashboardRouter)
userRouter.use('/checkout', userLoggedIn, checkoutRouter)
userRouter.use('/order',userLoggedIn, orderRouter)
userRouter.use('/address', userLoggedIn, addressRouter)

module.exports = {
    userRouter
}