const { getAllAddress } = require("../models/address.model");
const { getCartProducts } = require("../models/cart.model");
const { placeOrder, updatePaymentStatus } = require("../models/checkout.model");
const { razorpayPaymentGeneration, razorpayVerify } = require("../services/razorpay");

module.exports = {

    httpCheckoutPage: async (req, res) => {
        const user = req.user
        const cartItems = await getCartProducts(user.userId)
        let addressLength;
        
        return getAllAddress(user.userId)
            .then(response => {

                if (!response) addressLength = 0
                else addressLength = response.length

                return res.render('checkout', {
                    userStatus: user.loggedIn,
                    userId: user.userId,
                    userName: req.query.userName,
                    address: response,
                    addressLength: addressLength,
                    products: cartItems.product,
                    grandTotal: cartItems.grandTotal
                })
            })
            .catch(err => {
                console.log(err);
            })
    },

    httpPlaceOrder: async (req, res) => {
        const userId = req.user.userId
        const addressId = req.body.selectedAddress
        const paymentMethod = req.body.selectedPayment
        let orderId = null
        let totalAmount
        let orderStatus
        let quantityErr

        await placeOrder(userId, addressId, paymentMethod)
            .then(response => {
                totalAmount = response.totalAmount
                orderId = response.orderId
                orderStatus = response.status
            })
            .catch(err => {
                orderStatus = err.status
                quantityErr = err.quantityErr
            })

        if (orderId) {
            if (paymentMethod === 'cod') {
                return res.json({ orderId: orderId, orderStatus: orderStatus, ok: true })
            }
            if (paymentMethod === 'Razorpay') {
                const order = await razorpayPaymentGeneration(orderId, totalAmount)
                return res.json({ order: order, ok: true })
            }
        } else {
            return res.status(400).json({ orderStatus: orderStatus, quantityErr: quantityErr, ok: false })
        }


    }
    ,
    httpRazorpayVerify: async (req, res) => {
        const response = await razorpayVerify(req.body.payment)
            .catch(err => err)
        if (response.status) {
            const updated = await updatePaymentStatus(req.body).catch(err => err)
            if (updated) return res.json({ orderId: updated.orderId })
        }
        return res.status(400).json({err:"Payment Unsuccessful!"})
    }
}