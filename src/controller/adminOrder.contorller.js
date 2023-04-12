const {
    getOrderDetailsAdmin,
    getOrderCount,
    singleOrderAggreated,
    pagination,
    getSingleOrder
} = require('../models/order.model')

const httpAdminGetOrder = async (req, res) => {
    let isOrders = true
    let buttonLength = 0
    const totalCount = await getOrderCount()
    return await getOrderDetailsAdmin()
    .then(response => {
        if (response.length === 0) {
            isOrders = false
        }
            buttonLength = Math.ceil(totalCount / 10)
            return res.render('admin/admin-order', {
                layout: 'admin/admin-layout',
                adminTrue: req.session.admin,
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
    
    res.render('admin/admin-order-details',{
        layout: 'admin/admin-layout',
        adminTrue: req.session.admin,
        userDetails: userDetails,
        productDetails: productDetails,
        order: order,
        productOrderDetails:productOrderDetails
    })
}

const httpPagination = async (req, res) => {
    let skip = Number(req.query.skip)*10
    const orders = await pagination(skip)
    if (!orders) return res.status(400).json({ data: 'Error!', ok: false })
    return res.json({ data: orders, ok: false })
}

module.exports = {
    httpAdminGetOrder: httpAdminGetOrder,
    httpPagination: httpPagination,
    httpSingleOrder: httpSingleOrder
}