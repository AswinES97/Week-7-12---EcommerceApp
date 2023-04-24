const adminRouter = require('express').Router()
const {
    adminNotLoggedIn,
    adminLoggedIn
} = require('../middleware/session')
const {
    httpGetAdminDetails,
} = require('../controller/admin.controller')
const adminCategoryRouter = require('./admin.category.router')
const adminUsersRouter = require('./admin.users.router')
const adminProductsRouter = require('./admin.products.router')
const adminOrdersRouter = require('./adminOrder.router')
const { deleteToken } = require('../services/redis')


adminRouter.route('/')
    .all(adminNotLoggedIn)
    .get((req, res) => {
        res.render('admin/admin-dashboard', {
            layout: 'admin/admin-layout',
            adminTrue: req.admin
        })
    })

adminRouter.route('/admin-login')
    .all(adminLoggedIn)
    .get((req, res) => {
        res.render('admin/admin-login', {
            layout: 'admin/admin-layout',
            adminTrue: req.admin
        })
    })
    .post(httpGetAdminDetails)

adminRouter.route('/logout')
    .all(adminNotLoggedIn)
    .get(async(req, res) => {
        await deleteToken(req.cookies.admin_token)
        res.clearCookie('admin_token')
        return res.redirect('/v1/admin/admin-login')
    })


adminRouter.use('/users', adminNotLoggedIn, adminUsersRouter)
adminRouter.use('/products', adminNotLoggedIn, adminProductsRouter)
adminRouter.use('/category', adminNotLoggedIn, adminCategoryRouter)
adminRouter.use('/orders', adminNotLoggedIn, adminOrdersRouter)


module.exports = {
    adminRouter
}