const { httpOfferPage,httpGetAllCategoryOffer, httpCategoryOffer, httpDeleteCategoryOffer } = require('../controller/admin.offer.controller')

const adminOfferRouter = require('express').Router()

adminOfferRouter.route('/')
    .get(httpOfferPage)

adminOfferRouter.route('/category')
    .get(httpGetAllCategoryOffer)
    .post(httpCategoryOffer)
    .delete(httpDeleteCategoryOffer)

module.exports = adminOfferRouter