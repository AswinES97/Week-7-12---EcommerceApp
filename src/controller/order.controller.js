const { getAllOrderDetails, getSingleOrder, singleOrderAggreated } = require("../models/order.model")
const { format } = require('date-fns');
const { formatCurrency } = require("../services/currencyFormatter");

const httpGetOrderPage =async (req, res) => {
    const user = req.user
    const orderId = req.query.oId
    const orderDetails = await getSingleOrder(orderId)
    const [order] = await singleOrderAggreated(orderDetails)
    order.products.forEach(ele => {
        ele.boughtPrice = formatCurrency(ele.boughtPrice)
    });
    order.totalPrice = formatCurrency(order.totalPrice)
    console.log(order);
    
    res.render('orderPage', {
        userId: user.userId,
        userName: user.name,
        userStatus: user.loggedIn,
        boughtPrice : order.products,
        productDetails: order.productDetails,
        totalPrice: order.totalPrice
    })
}

const httpGetAllOrderDetails = async (req, res) => {
    const userId = req.user.userId
    return await getAllOrderDetails(userId)
        .then(response => {
            response = response.map(ele => {
                return {
                    orderId: ele.orderId,
                    orderStatus: ele.orderStatus,
                    orderDate: format(new Date(ele.createdAt), 'MMMM do, yyyy')
                }
            })
            return res.json({ data: response, ok: true })
        })
        .catch(err => res.status(400).json({ data: err, ok: false }))
}

module.exports = {
    httpGetOrderPage: httpGetOrderPage,
    httpGetAllOrderDetails: httpGetAllOrderDetails
}