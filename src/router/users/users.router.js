const express = require('express')
const {
    httpLoadUserLoginpage,
    httpsentOtpToUser,
    httpOtpVerify,
    httpEmailVerify,
    httpAddNewUserOtp,
    httpAddNewUserVerifyOtp,
} = require('./user.controller')
const userRouter = express.Router()

userRouter.route('/login')
    .get(httpLoadUserLoginpage)
    .post(httpsentOtpToUser)

userRouter.route('/login-otp')
    .post(httpOtpVerify)

userRouter.route('/login-email')
    .post(httpEmailVerify)

userRouter.route('/add-user')
    .post(httpAddNewUserOtp)

userRouter.route('/add-user-otp')
    .post(httpAddNewUserVerifyOtp)


module.exports = {
    userRouter
}