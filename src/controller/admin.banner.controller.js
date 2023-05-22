const { addNewBanner, getAllBanner, toggleBaner, deleteBanner, getSingleBanner } = require("../models/banner.model")
const cloudinary = require('cloudinary').v2;


const deletImageFromCloud = async (text1) => {
    let imgName
    const banner = await getSingleBanner(text1).catch(err => err)
    if (banner) {
        imgName = banner.image.split('/')
        imgName = imgName[imgName.length - 1]
        imgName = imgName.split('.')
        await cloudinary.uploader.destroy(`banner/${imgName[0]}`)
        return true
    }
    return false
}


const httpGetBannerPage = async (req, res) => {
    let hasBanner = true
    const allBanners = await getAllBanner()

    if (allBanners.length === 0) hasBanner = false

    return res.render('admin/admin-banner', {
        layout: 'admin/admin-layout',
        adminTrue: req.admin,
        active: "banner",
        hasBanner: hasBanner,
        allBanners: allBanners
    })
}

const httpAddNewBanner = async (req, res) => {
    const body = req.body
    const file = req.file
    const hasCreated = await addNewBanner(body, file).catch(err => err)
    res.redirect('/v1/admin/banner')
    // if (hasCreated) return res.json({ ok: true, data: "Banner created" })
    // return res.status(400).json({ ok: false, data: "Banner not created" })
}

const httpToggelBanner = async (req, res) => {
    let bool = true
    const body = req.body

    if (body.toggle == 'deactivate') bool = false
    const hasDeactivated = await toggleBaner(body.text1, bool).catch(err => err)
    if (hasDeactivated) return res.json({ ok: true, data: "Updated Banner" })

    return res.status(400).json({ ok: false, data: "Unable to Banner" })

}

const httpDeleteBanner = async (req, res) => {
    const text1 = req.body.text1
    const hasDeletedImage = await deletImageFromCloud(text1)
    const hasDeleted = await deleteBanner(text1).catch(err => err)
    
    if (hasDeleted && hasDeletedImage) return res.json({ ok: true, data: 'Banner Deleted' })
    return res.status(400).json({ ok: false, data: "Unable to delete" })
}

module.exports = {
    httpGetBannerPage: httpGetBannerPage,
    httpAddNewBanner: httpAddNewBanner,
    httpToggelBanner: httpToggelBanner,
    httpDeleteBanner: httpDeleteBanner
}