const { httpSentOtpToResetPassword, httpPasswordResetOtpVerify, httpResetPassword } = require('../controller/user.controller')

const resetPasswordRouter = require('express').Router()

resetPasswordRouter.route('/')
    .post(httpSentOtpToResetPassword)

resetPasswordRouter.route('/verify')
    .post(httpPasswordResetOtpVerify)
    .put(httpResetPassword)

module.exports = resetPasswordRouter