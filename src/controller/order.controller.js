const { getAllAddress } = require("../models/address.model");
const { getCartProducts } = require("../models/cart.model");
const { formatCurrency } = require("../services/currencyFormatter");

module.exports = {
    httpOrderPage: async (req, res) => {
        const cartItems = await getCartProducts(req.session.userId)
        return getAllAddress(req.session.userId)
            .then(response => {
                return res.render('order', {
                    userStatus: req.session.user,
                    userId: req.session.userId,
                    userName: req.query.userName,
                    address: response,
                    products: cartItems.product,
                    grandTotal: cartItems.grandTotal
                })
            })
            .catch(err => {
                return res.render('order', {
                    userStatus: req.session.user,
                    userId: req.session.userId,
                    userName: req.query.userName
                })
            })
    },

    httpNewOrder: (req, res) => {
        console.log(req.body);
    }
}