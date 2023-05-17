const { getAllOrderDetails, getSingleOrder, singleOrderAggreated, orderReturn } = require("../models/order.model")
const { format } = require('date-fns');
const { formatCurrency } = require("../services/currencyFormatter");
const { updateWallet } = require("../models/wallet.model");

const httpGetOrderPage = async (req, res) => {
    const user = req.user
    const orderId = req.query.oId
    const orderDetails = await getSingleOrder(orderId)
    const [order] = await singleOrderAggreated(orderDetails)
    order.products.forEach(ele => {
        ele.boughtPrice = formatCurrency(ele.boughtPrice)
    });
    order.totalPrice = formatCurrency(order.totalPrice)

    return res.render('orderPage', {
        userId: user.userId,
        userName: user.name,
        userStatus: user.loggedIn,
        cartCount: user.cartC,
        wishlistCount: user.wishlistC,
        boughtPrice: order.products,
        productDetails: order.productDetails,
        totalPrice: order.totalPrice,
        keyWord: false
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

const httpOrderReturn = async (req, res) => {
    const user = req.user
    const isReturned = await orderReturn(req.body).catch(err => err)
    console.log(isReturned);
    if (isReturned.orderStatus === 'Returned' && isReturned.isPaid) {
        const isUpdated = await updateWallet(user.userId, isReturned.totalPrice, 'Order Returned').catch(err => err)
        console.log(isUpdated);
        if (isUpdated) {
            return res.json({
                ok: true,
                data: 'Order Return Status and Wallet Updated '
            })
        }

        return res.json({
            ok: true,
            data: "Order Return Status Updated, Not updated Wallet, Contact Customer Care"
        })
    } else if (isReturned.orderStatus === 'Returned') {

        return res.json({
            ok: true,
            data: 'Order Cancled'
        })

    } else {
        return res.status(400).json({ ok: false, data: "Error Updating return" })
    }
}

module.exports = {
    httpGetOrderPage: httpGetOrderPage,
    httpGetAllOrderDetails: httpGetAllOrderDetails,
    httpOrderReturn: httpOrderReturn,
    formatDate: format
}