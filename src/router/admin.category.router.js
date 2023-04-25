const adminCategoryRouter = require('express').Router()
const { 
    httpGetCategoryPage,
    httpGetCategory,
    httpAddCategory,
    httpEditCatagory,
    httpDeleteCategory 
} = require('../controller/admin.category,controller')


adminCategoryRouter.route('/')
    .get(httpGetCategoryPage)

adminCategoryRouter.route('/all')
    .get(httpGetCategory)
    .post(httpAddCategory)
    .put(httpEditCatagory)
    .delete(httpDeleteCategory)

    
module.exports = adminCategoryRouter