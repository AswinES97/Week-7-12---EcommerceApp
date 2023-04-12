const { getAllAddress } = require("../models/address.model");
const { getCartProducts } = require("../models/cart.model");
const { placeOrder } = require("../models/checkout.model");

module.exports = {
    httpCheckoutPage: async (req, res) => {
        console.log(req.session);
        const cartItems = await getCartProducts(req.session.userId)
        return getAllAddress(req.session.userId)
            .then(response => {
                let addressLength;

                if (!response) addressLength = 0
                else addressLength = response.length

                return res.render('checkout', {
                    userStatus: req.session.user,
                    userId: req.session.userId,
                    userName: req.query.userName,
                    address: response,
                    addressLength,
                    products: cartItems.product,
                    grandTotal: cartItems.grandTotal
                })
            })
            .catch(err => {
                console.log(err);
            })
    },

    httpPlaceOrder: async (req, res) => {
        const userId = req.session.userId
        const addressId = req.body.selectedAddress
        const paymentMethod = req.body.selectedPayment
        const orderStatus = await placeOrder(userId,addressId,paymentMethod)
        
        if(orderStatus === 'Order Confirmed') 
            return res.json({orderStatus,ok:true})
        return res.status(400).json({orderStatus,ok:false})
    }
}