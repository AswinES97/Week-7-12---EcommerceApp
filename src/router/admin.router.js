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
const adminOfferRouter = require('./admin.offer.router')
const { totalRevenue, getMonthlyDataForAdmin } = require('../models/order.model')
const { getOrderCount } = require('../models/order.model')
const { productCount } = require('../models/products.model')

const currencyFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
});


adminRouter.route('/')
    .all(adminNotLoggedIn)
    .get(async (req, res) => {
        let [totalamount] = await totalRevenue().catch(err => err)
        const orderCount = await getOrderCount()
        const productTotalCount = await productCount()
        const monthlyData = await getMonthlyDataForAdmin().catch(err => err)

        totalamount = currencyFormatter.format(totalamount.totalRevenue)

        return res.render('admin/admin-dashboard', {
            layout: 'admin/admin-layout',
            adminTrue: req.admin,
            totalamount: totalamount,
            orderCount: orderCount,
            productTotalCount: productTotalCount,
            monthlyData: monthlyData
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
    .get(async (req, res) => {
        await deleteToken(req.cookies.admin_token)
        res.clearCookie('admin_token')
        return res.redirect('/v1/admin/admin-login')
    })


adminRouter.use('/products', adminNotLoggedIn, adminProductsRouter)
adminRouter.use('/category', adminNotLoggedIn, adminCategoryRouter)
adminRouter.use('/users', adminNotLoggedIn, adminUsersRouter)
adminRouter.use('/orders', adminNotLoggedIn, adminOrdersRouter)
adminRouter.use('/offer', adminNotLoggedIn, adminOfferRouter)


module.exports = {
    adminRouter
}