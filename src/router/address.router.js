const { 
    httpGetAllAddress, 
    httpAddNewAddress,
    httpUpdateAddress,
    httpGetSingleAddress,
    httpDeleteAddress 
} = require('../controller/address.controller')

const addressRouter = require('express').Router()

addressRouter.route('/')
    .get(httpGetAllAddress)
    .post(httpAddNewAddress)
    .put(httpUpdateAddress)

addressRouter.route('/:id')
    .get(httpGetSingleAddress)
    .delete(httpDeleteAddress)

module.exports = addressRouter