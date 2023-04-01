const {
    addToCart,
    removeFromCart,
    deleteAllProducts,
    getCartProducts
} = require("../../../models/cart.model")
const { getSingleProduct } = require('../../../models/products.model')
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
                        dataPresent: false
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
        const subTotal = quantity * product.price
        const data = {
            userId: req.session.userId,
            size,
            quantity,
            subTotal,
            pId: product._id,

        }
        if (data.userId && quantity && subTotal && size) {
            await addToCart(data)
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

    httpRemoveFromCart:async (req, res) => {
        const { slug } = req.body
        const userId = req.session.userId
        let pId = await getSingleProduct(slug).then(response=>JSON.parse(JSON.stringify(response._id)))
        const data = {
            pId,userId
        }
        if (!pId || !userId) {
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