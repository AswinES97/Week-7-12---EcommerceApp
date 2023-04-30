const {
    addToCart,
    removeFromCart,
    deleteAllProducts,
    getCartProducts,
    updateProductInCart
} = require("../models/cart.model")
const { getSingleProduct } = require('../models/products.model')
const { updateRedis } = require("../services/redis")

module.exports = {
    httpUserCart: (req, res) => {
        const user = req.user
        let dataPresent
        getCartProducts(user.userId)
            .then(data => {
                dataPresent = true
                if (data.length === 0) dataPresent = false
                return res.render('users/cart', {
                    userStatus: user.loggedIn,
                    userName: user.name,
                    userId: user.userId,
                    cartCount: user.cartC,
                    wishlistCount: user.wishlistC,
                    dataPresent: dataPresent,
                    grandTotal: data.grandTotal,
                    products: data.product
                })
            })
            .catch(err => console.log(err))
    },

    httpAddToCart: async (req, res) => {
        const user = req.user
        let product;
        await getSingleProduct(req.body.pId)
            .then(response => {
                product = JSON.parse(JSON.stringify(response))
            })
        const { size, quantity } = req.body
        const subTotal = Number(quantity) * product.price
        const data = {
            userId: user.userId,
            size,
            quantity,
            subTotal,
            pId: req.body.pId
        }

        if (data.userId && quantity && subTotal && size) {
            return await addToCart(data)
                .then(async response => {
                    const count = response.product.length
                    user.cartC = count
                    await updateRedis(req.cookies.token, user)

                    return res.json({ "ok": 'Proudct Added!' ,cartC : user.cartC})
                })
                .catch(err => {
                    return res.status(400).json({ 'err': 'Not Added!' })
                })
        }
        else if (user.userId && product) {
            const data = {
                userId: user.userId,
                size: product.quantity.size,
                quantity: 1,
                subTotal: product.price,
                pId: req.body.pId
            }
            return await addToCart(data)
                .then(async response => {
                    const count = response.product.length
                    user.cartC = count
                    await updateRedis(req.cookies.token, user)
                    return res.json({ "ok": 'Proudct Added!' ,cartC : user.cartC})
                })
                .catch(err => res.status(400).json({ 'err': 'Not Added!' }))

        } else {
            return res.status(400).json({ 'err': 'Not added' })
        }
    },

    httpRemoveFromCart: async (req, res) => {
        const user = req.user
        const { pId, price } = req.body
        const data = {
            pId: pId,
            userId: user.userId,
            price: price
        }
        if (!pId || !user.userId || !price) {
            return res.status(400).json({ "err": "Not-Removed!" })
        } else {
            removeFromCart(data)
                .then(async response => {
                    const count = response.product.length
                    user.cartC = count
                    await updateRedis(req.cookies.token, user)
                    return res.json({ 'ok': 'Removed!' })
                })
                .catch(err => {
                    console.log('err:', err);
                    return res.status(400).json({ 'err': 'Not Removed!' })
                })
        }
    },

    httpDeleteAllProducts: (req, res) => {
        const userId = req.user.userId

        if (!userId) {
            return res.status(400).json({ 'err': 'Cart not cleared!' })
        } else {
            deleteAllProducts(userId)
                .then(response => {
                    return res.json({ 'ok': 'deleted' })
                })
                .catch(err => res.status(400).json({ 'err': 'Cart not cleared!' }))
        }
    },

    httpUpdateProductInCart: (req, res) => {
        const userId = req.user.userId
        return updateProductInCart(req.body, userId)
            .then((response) => {
                return res.json(response)
            })
            .catch(() => res.status(400).json({ 'err': 'Not Updated' }))
    }

}