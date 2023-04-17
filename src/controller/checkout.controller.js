const { getAllAddress } = require("../models/address.model");
const { getCartProducts } = require("../models/cart.model");
const { placeOrder } = require("../models/checkout.model");

module.exports = {

    httpCheckoutPage: async (req, res) => {
        const user = req.user
        const cartItems = await getCartProducts(user.userId)
        return getAllAddress(user.userId)
            .then(response => {
                let addressLength;

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
        let orderStatus
        let orderId
        await placeOrder(userId, addressId, paymentMethod)
            .then(response => {
                orderId = response.orderId
                return res.json({ orderId: orderId, orderStatus:response.status, ok: true })
            })
            .catch(err => {
                let orderStatus = err.status
                let quantityErr = err.quantityErr
                return res.status(400).json({ orderStatus: orderStatus, quantityErr: quantityErr , ok: false })
            })


    }
}