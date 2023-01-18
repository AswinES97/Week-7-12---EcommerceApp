const express = require('express')
const {
    adminNotLoggedIn, 
    adminLoggedIn
} = require('../../services/session')
const adminCategoryRouter = require('./admin-category/admin.category.router')
const adminProductsRouter = require('./admin-products/admin.products.router')
const adminUsersRouter = require('./admin-users/admin.users.router')
const {
    httpGetAdminDetails,
} = require('./admin.controller')

const adminRouter = express.Router()

adminRouter.route('/')
    .all(adminNotLoggedIn)
    .get((req, res) => {
        res.render('admin/admin-dashboard', { 
            layout: 'admin/admin-layout',
            adminTrue:req.session.admin 
        })
    })

adminRouter.route('/admin-login')
    .all(adminLoggedIn)
    .get((req, res) => {
        res.render('admin/admin-login', { 
            layout: 'admin/admin-layout',
            adminTrue:req.session.admin  
        })
    })
    .post(httpGetAdminDetails)

adminRouter.route('/logout')
    .get((req,res)=>{
        req.session.admin = null
        return res.redirect('/v1/admin/admin-login')
    })


adminRouter.use('/users',adminNotLoggedIn, adminUsersRouter)
adminRouter.use('/products',adminNotLoggedIn, adminProductsRouter)
adminRouter.use('/category',adminNotLoggedIn, adminCategoryRouter)

module.exports = {
    adminRouter
}