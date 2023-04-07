const {
    addToCart,
    removeFromCart,
    deleteAllProducts,
    getCartProducts,
    updateProductInCart
} = require("../models/cart.model")
const { getSingleProduct } = require('../models/products.model')

module.exports = {
    httpUserCart: (req, res) => {
        const userName = req.query.name
        const userId = req.query.id

        if (userName && userId) {
            getCartProducts(userId)
                .then(data => {
                    const products = data.product
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
                    return res.render('users/cart', {
                        userStatus: req.session.user,
                        userName,
                        userId,
                        dataPresent: false,
                        grandTotal: 0,
                    })
                })
        }
    },

    httpAddToCart: async (req, res) => {
        let product;

        await getSingleProduct(req.body.slug)
            .then(response => {
                product = JSON.parse(JSON.stringify(response))
            })

        const { size, quantity } = req.body
        const subTotal = Number(quantity) * product.price
        const data = {
            userId: req.session.userId,
            size,
            quantity,
            subTotal,
            pId: product._id
        }

        if (data.userId && quantity && subTotal && size) {
            return await addToCart(data)
                .then(response => {
                    return res.json({ "ok": 'Proudct Added!' })
                })
                .catch(err => {
                    return res.status(400).json({ 'err': 'Not Added!' })
                })
        }
        else if (req.session.userId && product) {
            const data = {
                userId: req.session.userId,
                size: product.quantity.size,
                quantity: 1,
                subTotal: product.price,
                pId: product._id
            }
            return await addToCart(data)
                .then(response => {
                    return res.json({ "ok": 'Proudct Added!' })
                })
                .catch(err => res.status(400).json({ 'err': 'Not Added!' }))

        } else {
            return res.status(400).json({ 'err': 'Not added' })
        }
    },

    httpRemoveFromCart: async (req, res) => {
        const { slug, quantity, price } = req.body
        const userId = req.session.userId
        let pId = await getSingleProduct(slug).then(response => JSON.parse(JSON.stringify(response._id)))
        const data = {
            pId,
            userId,
            price
        }
        if (!pId || !userId || !price) {
            return res.status(400).json({ "err": "Not-Removed!" })
        } else {
            removeFromCart(data)
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
        const userId = req.session.userId

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
        const userId = req.session.userId
        return updateProductInCart(req.body, userId)
            .then((response) => {
                return res.json(response)
            })
            .catch(() => res.status(400).json({ 'err': 'Not Updated' }))
    }

}