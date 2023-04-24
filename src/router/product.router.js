const productRouter = require('express').Router()
const { 
    getSingleProductPage
} = require('../controller/product.controller')


productRouter.route('/')
    .get(getSingleProductPage)

module.exports = productRouter