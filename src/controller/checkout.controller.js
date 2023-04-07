const { getAllAddress } = require("../models/address.model");
const { getCartProducts } = require("../models/cart.model");

module.exports = {
    httpCheckoutPage: async (req, res) => {
        const cartItems = await getCartProducts(req.session.userId)
        return getAllAddress(req.session.userId)
            .then(response => {
                return res.render('checkout', {
                    userStatus: req.session.user,
                    userId: req.session.userId,
                    userName: req.query.userName,
                    address: response,
                    addressLength: response.length,
                    products: cartItems.product,
                    grandTotal: cartItems.grandTotal
                })
            })
            .catch(err => {
                console.log(err);
            })
    },

    httpNewOrder: (req, res) => {
        console.log(req.body);
    }
}