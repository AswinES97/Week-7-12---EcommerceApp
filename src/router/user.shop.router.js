const { httpGeneralShopPageController, httpShopCategoryFilter } = require('../controller/user.shop.controller')

const shopRouter = require('express').Router()

shopRouter.route('/')
    .get(httpGeneralShopPageController)

shopRouter.route('/categoryFilter')
    .get(httpShopCategoryFilter)


module.exports = shopRouter