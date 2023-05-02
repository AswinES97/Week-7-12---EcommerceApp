const { addToWishlist, getWishlistData, removeFormWishlist, wishlistCount } = require("../models/wishlist.model")
const { formatCurrency } = require("../services/currencyFormatter");
const { updateRedis } = require("../services/redis");

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
                cartCount: user.cartC,
                wishlistCount: user.wishlistC,
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
                wishlistCount: user.wishlistC,
                cartCount: user.cartC,
                productStatus: productStatus
            })
        })
}

const httpAddToWishlist = async (req, res) => {
    const token = req.cookies.token
    const user = req.user
    const userId = req.user.userId
    const slug = req.body.slug
    const response = await addToWishlist({ userId, slug }).catch(err => err)
    const newWishlistCount = await wishlistCount(userId)
    user.wishlistC = newWishlistCount
    await updateRedis(token, user)
    const data = {
        text: 'Added to Wishlist!',
        newWishlistCount: newWishlistCount
    }

    if (response) return res.json({ ok: true, data: data })
    return res.status(400).json({ ok: false, data: 'Already Exist in Wishlist!' })
}

const httpRemoveFromWishlist = async (req, res) => {
    const user = req.user
    const userId = req.user.userId
    const slug = req.body.slug
    const response = await removeFormWishlist({ userId, slug }).catch(err => err)
    user.wishlistC = user.wishlistC - 1
    await updateRedis(req.cookies.token, user)

    if (response) return res.json({ ok: true, data: "Wishlist Updated!" })
    return res.status(400).json({ ok: true, data: "Wishlist Not Updated!" })
}

module.exports = {
    httpGetWishlistPage: httpGetWishlistPage,
    httpAddToWishlist: httpAddToWishlist,
    httpRemoveFromWishlist: httpRemoveFromWishlist
}