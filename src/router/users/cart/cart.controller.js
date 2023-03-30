const {
    addToCart,
    removeFromCart,
    deleteAllProducts,
    getCartProducts
} = require("../../../models/cart.model")

module.exports = {
    httpUserCart: (req, res) => {
        const userName = req.query.name
        const userId = req.query.id

        if (userName && userId) {
            getCartProducts(userId)
                .then(data => {
                    const products = data.product
                    console.log(products);
                    return res.render('users/cart', {
                        userStatus: req.session.user,
                        userName,
                        userId,
                        dataPresent: true,
                        grandTotal: data.grandTotal,
                        products
                    })
                })
                .catch(err => {
                    console.log("err-cart-load:",err);
                    return res.render('users/cart', {
                        userStatus: req.session.user,
                        userName,
                        userId,
                        dataPresent: false
                    })
                })
        }
    },

    httpAddToCart: async (req, res) => {
        const { userId, pId, quantity, subTotal, grandTotal } = req.body
        if (userId && pId && quantity && subTotal && grandTotal) {
            await addToCart(req.body)
                .then(response => {
                    return res.json({ "ok": 'Proudct Added!' })
                })
                .catch(err => {
                    console.log('add to cart err:', err);
                    return res.status(400).json({ 'err': 'Not Added!' })
                })
        }
        else if (userId && pId) {
            const data = {
                userId,
                pId,
                qu
            }
        } else {
            return res.status
        }
    },

    httpRemoveFromCart: (req, res) => {
        const { pId, userId } = req.body

        if (!pId || !userId) {
            return res.status(400).json({ "err": "Not Removed!" })
        } else {
            removeFromCart(req.body)
                .then(response => {
                    return res.json({ 'ok': 'Removed!' })
                })
                .catch(err => {
                    console.log('err:', err);
                    return res.status(400).json({ 'err': 'Not Removed!' })
                })
        }
    },

    httpDeleteAllProducts: (req, res) => {
        const { userId } = req.body

        if (!userId) {
            return res.status(400).json({ "err": "Not Deleted!" })
        } else {
            deleteAllProducts(req.body)
                .then(response => {
                    return res.json({ 'ok': 'deleted' })
                })
                .catch(err => res.status(400).json({ 'err': 'Not Deleted!' }))
        }
    },

    httpUpdateProductInCart: (req, res) => {

    }

}