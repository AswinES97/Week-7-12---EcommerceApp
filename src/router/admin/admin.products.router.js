const {
    httpGetAllProducts,
    httpAddNewProduct
} = require('./admin.products.controller')

const productsRouter = require('express').Router()

productsRouter.route('/')
    .get(httpGetAllProducts)

productsRouter.route('/add-product')
    .post(httpAddNewProduct)

module.exports = productsRouter