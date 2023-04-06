const { 
    httpGetAllAddress, 
    httpAddNewAddress,
    httpUpdateAddress,
    httpGetSingleAddress 
} = require('../controller/address.controller')

const addressRouter = require('express').Router()

addressRouter.route('/')
    .get(httpGetAllAddress)
    .post(httpAddNewAddress)
    .put(httpUpdateAddress)

addressRouter.route('/:id')
    .get(httpGetSingleAddress)

module.exports = addressRouter