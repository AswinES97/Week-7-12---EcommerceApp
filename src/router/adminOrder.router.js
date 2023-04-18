const { httpAdminGetOrder,
        httpSingleOrder,
        httpPagination,
        httpChangeOrderStatus
} = require('../controller/adminOrder.contorller')

const adminOrdersRouter = require('express').Router()

adminOrdersRouter.route('/')
        .get(httpAdminGetOrder)

adminOrdersRouter.route('/single')
        .get(httpSingleOrder)
        .post(httpChangeOrderStatus)

adminOrdersRouter.route('/pagination')
        .get(httpPagination)

module.exports = adminOrdersRouter