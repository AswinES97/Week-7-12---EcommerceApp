const { httpGetWallet } = require('../controller/user.wallet.controller')

const userWalletRouter = require('express').Router()

userWalletRouter.route('/')
    .get(httpGetWallet)

module.exports = userWalletRouter