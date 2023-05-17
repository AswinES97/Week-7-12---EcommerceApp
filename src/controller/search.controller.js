const { cartCount } = require("../models/cart.model")
const { userProductSearch } = require("../models/products.model")
const { wishlistCount } = require("../models/wishlist.model")

const httpSearchController = async (req, res) => {
    let wishlistC
    let cartC
    const user = req.user
    const keyWord = req.query.keyWord
    const searchProductsResult = await userProductSearch(keyWord)

    console.log('search products:', searchProductsResult, "\n keyword:", keyWord)

    if (user.loggedIn) {
        wishlistC = await wishlistCount(user.userId)
        cartC = await cartCount(user.userId)
    }

    return res.render('search', {
        userStatus: user.loggedIn,
        userName: user.name,
        userId: user.userId,
        wishlistCount: wishlistC,
        cartCount: cartC,
        products: searchProductsResult,
        keyWord: keyWord
    })
}

module.exports = {
    httpSearchController: httpSearchController
}