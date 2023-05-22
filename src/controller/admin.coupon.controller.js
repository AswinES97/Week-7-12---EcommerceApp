const { addNewCoupon, getAllCoupon, deleteCoupon, toggleCoupon } = require("../models/coupon.model")
const { formatDate } = require('./order.controller')


const httpGetCouponPage = async (req, res) => {
    let hasCoupons = true
    const allCoupons = await getAllCoupon()

    if (allCoupons.length === 0) hasCoupons = false
    return res.render('admin/admin-coupon', {
        layout: 'admin/admin-layout',
        adminTrue: req.admin,
        active: "coupon",
        hasCoupons: hasCoupons,
        allCoupons: allCoupons,
        formatDate: formatDate
    })
}

const httpAddNewCoupon = async (req, res) => {
    const body = req.body
    const expiryDate = new Date(body.expiryDate)
    const nowDate = new Date()
    if (expiryDate > nowDate) {
        console.log('herre');
        const isCreated = await addNewCoupon(body).catch(err => err)
        if (isCreated) return res.json({ ok: true, data: 'Coupon Created' })
    }
    return res.status(400).json({ ok: false, data: 'Error Creating Coupon' })
}

const httpDeactivateCoupon = async (req, res) => {
    let bool = true
    const body = req.body
    
    if (body.toggle == 'deactivate') bool = false
    const hasDeactivated = await toggleCoupon(body.code, bool)
    if (hasDeactivated) return res.json({ ok: true, data: "Updated Coupon" })
    
    return res.status(400).json({ ok: false, data: "Unable to Update" })
}

const httpDeleteCoupon = async (req, res) => {
    const code = req.body.code
    const hasDeleted = await deleteCoupon(code)
    
    if (hasDeleted) return res.json({ ok: true, data: "Deleted Coupon" })
    return res.status(400).json({ ok: false, data: "Unable to delete" })
}

module.exports = {
    httpGetCouponPage: httpGetCouponPage,
    httpAddNewCoupon: httpAddNewCoupon,
    httpDeactivateCoupon: httpDeactivateCoupon,
    httpDeleteCoupon: httpDeleteCoupon
}