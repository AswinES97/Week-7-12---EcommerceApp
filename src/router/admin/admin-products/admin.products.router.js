const { 
    uploadImageMulti
} = require('../../../services/multer')
const {
    httpGetAllProducts,
    httpAddNewProduct,
    httpEditProduct,
    httpDeleteProduct,
    httpGetAddProductPage,
    httpGetProductEditPage
} = require('./admin.products.controller')

const adminProductsRouter = require('express').Router()

adminProductsRouter.route('/')
    .get(httpGetAllProducts)

adminProductsRouter.route('/add-product')
    .get(httpGetAddProductPage)
    .post(uploadImageMulti,httpAddNewProduct)

adminProductsRouter.route('/:id')
    .get(httpGetProductEditPage)
    .post(uploadImageMulti,httpEditProduct)
    .delete(httpDeleteProduct)

module.exports = adminProductsRouter