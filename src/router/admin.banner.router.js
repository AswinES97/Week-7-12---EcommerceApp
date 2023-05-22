const { httpGetBannerPage, httpAddNewBanner, httpToggelBanner, httpDeleteBanner } = require('../controller/admin.banner.controller')
const { bannerImageUpload } = require('../services/multer')
const adminBannerRouter = require('express').Router()

adminBannerRouter.route('/')
    .get(httpGetBannerPage)
    .post(bannerImageUpload,httpAddNewBanner)
    .put(httpToggelBanner)
    .delete(httpDeleteBanner)

module.exports = adminBannerRouter 