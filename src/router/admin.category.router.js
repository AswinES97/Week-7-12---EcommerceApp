const adminCategoryRouter = require('express').Router()
const { 
    httpGetCategoryPage,
    httpGetCategory,
    httpAddCategory, 
} = require('../controller/admin.category,controller')


adminCategoryRouter.route('/')
    .get(httpGetCategoryPage)

adminCategoryRouter.route('/all')
    .get(httpGetCategory)
    .post(httpAddCategory)

    
module.exports = adminCategoryRouter