const { getUser } = require("../models/user.model")
const { getAllOrderDetails } = require('../models/order.model')
const { formatDate } = require('./order.controller')

module.exports = {
    httpGetDashboardPage: async (req, res) => {
        const isOrdered = req.query.isOrdered
        const user = req.user
        let orderDetails

        if (isOrdered) {
            orderDetails = await getAllOrderDetails(user.userId)
            console.log(orderDetails);
        }

        return res.render('users/dashboard', {
            userName: user.name,
            userId: user.userId,
            userStatus: user.loggedIn,
            isOrdered: isOrdered,
            cartCount: user.cartC,
            wishlistCount: user.wishlistC,
            orderDetails: orderDetails,
            formatDate: formatDate
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
    }
}