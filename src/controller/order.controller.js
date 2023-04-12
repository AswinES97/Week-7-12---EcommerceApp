const { getAllOrderDetails } = require("../models/order.model")
const { format } = require('date-fns');

const httpGetOrderPage = (req, res) => {
    res.render('orderPage', {
        userId: req.session.userId,
        userName: req.session.userName,
        userStatus: true
    })
}

const httpGetAllOrderDetails = async (req, res) => {
    const userId = req.session.userId
    return await getAllOrderDetails(userId)
        .then(response => {
            response = response.map(ele => {
                return {
                    orderId: ele.orderId,
                    orderStatus: ele.orderStatus,
                    orderDate: format(new Date(ele.createdAt), 'yyyy-MM-dd')
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