const { 
    httpGetAllAddress, 
    httpAddNewAddress,
    httpUpdateAddress 
} = require('./address.controller')

const addressRouter = require('express').Router()

addressRouter.route('/')
    .get(httpGetAllAddress)
    .post(httpAddNewAddress)
    .put(httpUpdateAddress)

module.exports = addressRouter