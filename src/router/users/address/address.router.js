const { 
    httpGetAllAddress, 
    httpAddNewAddress 
} = require('./address.controller')

const addressRouter = require('express').Router()

addressRouter.route('/')
    .get(httpGetAllAddress)
    .post(httpAddNewAddress)

module.exports = addressRouter