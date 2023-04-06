const { 
    getSingleProductPage
} = require('../controller/product.controller')

const productRouter = require('express').Router()

productRouter.route('/:slug')
    .get(getSingleProductPage)

module.exports = productRouter