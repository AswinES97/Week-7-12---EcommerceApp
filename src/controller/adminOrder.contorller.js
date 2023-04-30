const {
    getOrderDetailsAdmin,
    getOrderCount,
    singleOrderAggreated,
    pagination,
    getSingleOrder,
    changeOrderStatus
} = require('../models/order.model')
const { formatCurrency } = require('../services/currencyFormatter')
const { formatDate } = require('./order.controller')

const httpAdminGetOrder = async (req, res) => {
    let isOrders = true
    let buttonLength = 0
    const totalCount = await getOrderCount()
    return await getOrderDetailsAdmin()
        .then(response => {
            if (response.length === 0) {
                isOrders = false
            } else {
                response.forEach(ele => {
                    ele.totalPrice = formatCurrency(ele.totalPrice)
                    ele.createdAt = formatDate(new Date(ele.createdAt), 'MMMM do, yyy')
                })
            }
            buttonLength = Math.ceil(totalCount / 10)

            return res.render('admin/admin-order', {
                layout: 'admin/admin-layout',
                adminTrue: req.admin,
                isOrders: isOrders,
                orders: response,
                buttonLength: buttonLength
            })
        })
}

const httpSingleOrder = async (req, res) => {
    const orderId = req.query.oId
    const orderDetails = await getSingleOrder(orderId)
    const [order] = await singleOrderAggreated(orderDetails)
    const [userDetails] = order.userDetails
    const productDetails = order.productDetails
    const productOrderDetails = order.products
    order.createdAt = formatDate(new Date(order.createdAt), 'MMMM do, yyy')
    order.totalPrice = formatCurrency(order.totalPrice)

    productDetails.forEach(ele => {
        ele.price = formatCurrency(ele.price)
    })
    productOrderDetails.forEach(ele => {
        ele.boughtPrice = formatCurrency(ele.boughtPrice)
    })

    res.render('admin/admin-order-details', {
        layout: 'admin/admin-layout',
        adminTrue: req.admin,
        userDetails: userDetails,
        productDetails: productDetails,
        order: order,
        productOrderDetails: productOrderDetails
    })
}

const httpChangeOrderStatus = async (req, res) => {
    return await changeOrderStatus(req.body)
        .then(() => {
            return res.json({ ok: true, data: 'Status Updated!' })
        })
        .catch(() => {
            return res.status(400).json({ ok: false, data: 'Status Not Updated!' })
        })
}

const httpPagination = async (req, res) => {
    let skip = Number(req.query.skip) * 10
    const orders = await pagination(skip)
    if (!orders) return res.status(400).json({ data: 'Error!', ok: false })
    orders.forEach(ele => {
        ele.totalPrice = formatCurrency(ele.totalPrice)
        ele.orderDate = formatDate(new Date(ele.orderDate), 'MMMM do, yyy')
    })
    return res.json({ data: orders, ok: false })
}

module.exports = {
    httpAdminGetOrder: httpAdminGetOrder,
    httpSingleOrder: httpSingleOrder,
    httpChangeOrderStatus: httpChangeOrderStatus,
    httpPagination: httpPagination,
}