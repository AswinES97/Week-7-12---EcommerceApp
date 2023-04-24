const adminProductsRouter = require('express').Router()
const {
    httpGetAllProducts,
    httpAddNewProduct,
    httpEditProduct,
    httpDeleteProduct,
    httpGetAddProductPage,
    httpGetProductEditPage
} = require('../controller/admin.products.controller')
const { 
    uploadImageMulti
} = require('../services/multer')


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