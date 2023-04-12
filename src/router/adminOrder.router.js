const { httpAdminGetOrder,
        httpSingleOrder,
        httpPagination
} = require('../controller/adminOrder.contorller')

const adminOrdersRouter = require('express').Router()

adminOrdersRouter.route('/')
        .get(httpAdminGetOrder)

adminOrdersRouter.route('/single')
        .get(httpSingleOrder)

adminOrdersRouter.route('/pagination')
        .get(httpPagination)

module.exports = adminOrdersRouter