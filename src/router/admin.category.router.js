const { 
    httpGetCategoryPage,
    httpGetCategory,
    httpAddCategory, 
} = require('../controller/admin.category,controller')

const adminCategoryRouter = require('express').Router()

adminCategoryRouter.route('/')
    .get(httpGetCategoryPage)

adminCategoryRouter.route('/all')
    .get(httpGetCategory)
    .post(httpAddCategory)

    
module.exports = adminCategoryRouter