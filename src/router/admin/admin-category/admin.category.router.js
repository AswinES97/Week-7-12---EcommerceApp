const { 
    httpGetCategoryPage, 
} = require('./admin.category,controller')

const adminCategoryRouter = require('express').Router()

adminCategoryRouter.route('/')
    .get(httpGetCategoryPage)

module.exports = adminCategoryRouter