const { cartCount } = require("../models/cart.model")
const { getCategoryFilter } = require("../models/category.model")
const { productWithCategory, categoryFilterCount, shopCategoryFilter } = require("../models/products.model")
const { wishlistCount } = require("../models/wishlist.model")
const { formatCurrency } = require("../services/currencyFormatter")
const { createProductCard } = require("./user.pagination.controller")

const httpGeneralShopPageController = async (req, res) => {
    let hasProducts = true
    const user = req.user
    const category = req.query.page
    const products = await productWithCategory(category).catch(err => err)
    const cartC = await cartCount(user.userId)
    const wishlistC = await wishlistCount(user.userId)
    const categoryCount = await categoryFilterCount(category)
    const count = Math.ceil(categoryCount / 10)
    const [subAndTypeCategory] = await getCategoryFilter(category)
    if (products.length === 0) hasProducts = false

    return res.render('users/shop', {
        hasProducts: hasProducts,
        products: products,
        userName: user.name,
        userId: user.userId,
        userStatus: user.loggedIn,
        wishlistCount: wishlistC,
        cartCount: cartC,
        page: category,
        paginationCount: categoryCount,
        count: count,
        subAndTypeCategory: subAndTypeCategory,
        formatCurrency: formatCurrency,
        keyWord: false
    })

}

const httpShopCategoryFilter = async (req, res) => {
    const user = req.user
    const query = req.query
    const products = await shopCategoryFilter(query)
    const data = createProductCard(products, user.loggedIn)
    return res.json({ ok: true, data: data, pcount: products.length })
}

module.exports = {
    httpGeneralShopPageController: httpGeneralShopPageController,
    httpShopCategoryFilter: httpShopCategoryFilter
}