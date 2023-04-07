const { 
    getSingleProductPage
} = require('../controller/product.controller')

const productRouter = require('express').Router()

productRouter.route('/')
    .get(getSingleProductPage)

module.exports = productRouter