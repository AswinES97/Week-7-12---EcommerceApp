const { getUser } = require("../models/user.model")
const { getAllOrderDetails, getSingleOrder, singleOrderAggreated, cancelOrder } = require('../models/order.model')
const { formatDate } = require('./order.controller')
const { formatCurrency } = require('../services/currencyFormatter')
const { updateWallet } = require("../models/wallet.model")

const returnD = (date) => {
    const specificDate = new Date(date);
    const currentDate = new Date();
    const difference = currentDate.getTime() - specificDate.getTime();
    const differenceInDays = Math.round(difference / 86400000);

    return differenceInDays
}

module.exports = {
    httpGetDashboardPage: async (req, res) => {
        const isOrdered = req.query.isOrdered
        const user = req.user
        let orderDetails

        if (isOrdered) {
            orderDetails = await getAllOrderDetails(user.userId)
        }

        return res.render('users/dashboard', {
            userName: user.name,
            userId: user.userId,
            userStatus: user.loggedIn,
            isOrdered: isOrdered,
            cartCount: user.cartC,
            wishlistCount: user.wishlistC,
            orderDetails: orderDetails,
            formatDate: formatDate,
            keyWord: false
        })
    }
    ,
    httpUserDetails: async (req, res) => {
        const userId = req.user.userId
        return await getUser(null, userId)
            .then(response => {
                return res.json({ ok: true, fname: response.fname, lname: response.lname, email: response.email, phn_no: response.phn_no })
            })
            .catch(err => {
                return res.status(400).json({ ok: false, data: "Error fetching UserInfo" })
            })
    },

    httpSingleOrderDetails: async (req, res) => {
        const user = req.user
        const orderId = req.query.oId
        const singleOrderDetaisl = await getSingleOrder(orderId).catch(err => err)
        const [orderDetails] = await singleOrderAggreated(singleOrderDetaisl)
        const returnDate = returnD(orderDetails.createdAt)

        return res.render('users/order-details', {
            userName: user.name,
            userId: user.userId,
            userStatus: user.loggedIn,
            cartCount: user.cartC,
            wishlistCount: user.wishlistC,
            orderDetails: orderDetails,
            products: orderDetails.productDetails,
            address: orderDetails.shippingAddress,
            returnDate: returnDate,
            formatDate: formatDate,
            formatCurrency: formatCurrency,
            keyWord: false
        })
    },

    httpCancelOrder: async (req, res) => {
        let isUpdated
        const user = req.user
        console.log(user);
        const response = await cancelOrder(req.body).catch(err => err)
        if (response.orderStatus === 'Cancled' && response.isPaid) {
            isUpdated = await updateWallet(user.userId, response.totalPrice, "Order Cancled").catch(err => err)
            if (isUpdated) {

                return res.json({
                    ok: true,
                    data: 'Order Cancled and Updated Wallet'
                })
            }

            return res.json({
                ok: true,
                data: "Cancled order, Not updated Wallet, Contact Customer Care"
            })

        } else if (response.orderStatus === 'Cancled') {

            return res.json({
                ok: true,
                data: 'Order Cancled'
            })

        } else {

            return res.status(400).json({
                ok: false,
                data: 'Error Cancling Order'
            })
        }
    }
}