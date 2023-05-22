const { httpGetCouponPage, httpAddNewCoupon, httpDeleteCoupon, httpDeactivateCoupon } = require('../controller/admin.coupon.controller')

const adminCouponRouter = require('express').Router()

adminCouponRouter.route('/')
    .get(httpGetCouponPage)
    .post(httpAddNewCoupon)

adminCouponRouter.route('/edit')
    .put(httpDeactivateCoupon)
    .delete(httpDeleteCoupon)

module.exports = adminCouponRouter  