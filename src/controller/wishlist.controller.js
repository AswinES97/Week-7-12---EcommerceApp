const { addToWishlist, getWishlistData, removeFormWishlist } = require("../models/wishlist.model")
const { formatCurrency } = require("../services/currencyFormatter");

const httpGetWishlistPage = async (req, res) => {
    const user = req.user
    let productStatus = false
    return await getWishlistData(user.userId)
        .then(([products]) => {
            productStatus = true
            return res.render('users/whishlist', {
                userName: user.name,
                userId: user.userId,
                userStatus: user.loggedIn,
                productStatus: productStatus,
                products: products,
                formatCurrency: formatCurrency
            })
        })
        .catch(err => {
            return res.render('users/whishlist', {
                userName: user.name,
                userId: user.userId,
                userStatus: user.loggedIn,
                productStatus: productStatus
            })
        })
}

const httpAddToWishlist = async (req, res) => {
    const userId = req.user.userId
    const slug = req.body.slug
    const response = await addToWishlist({ userId, slug }).catch(err => err)

    if (response) return res.json({ ok: true, data: 'Added to Wishlist!' })
    return res.status(400).json({ ok: false, data: 'Already Exist in Wishlist!' })
}

const httpRemoveFromWishlist = async (req, res) => {
    const userId = req.user.userId
    const slug = req.body.slug
    const response = await removeFormWishlist({ userId, slug }).catch(err => err)

    if(response) return res.json({ok:true,data:"Wishlist Updated!"})
    return res.status(400).json({ok:true,data:"Wishlist Not Updated!"})
}

module.exports = {
    httpGetWishlistPage: httpGetWishlistPage,
    httpAddToWishlist: httpAddToWishlist,
    httpRemoveFromWishlist: httpRemoveFromWishlist
}