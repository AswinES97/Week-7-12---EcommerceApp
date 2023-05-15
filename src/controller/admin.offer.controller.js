const { getAllCategoryOffer, createCategoryOffer, deleteCategoryOffer } = require("../models/offer.model")
const { productOfferApply, productOfferClear } = require("../models/products.model")

const httpOfferPage = (req, res) => {
    return res.render('admin/admin-offer', {
        layout: 'admin/admin-layout',
        adminTrue: req.admin,
        active: 'offers'
    })
}

const httpGetAllCategoryOffer = async (req, res) => {
    const response = await getAllCategoryOffer().catch(err => err)
    let htmlRender = ''
    if (response) {

        htmlRender += `<div class="table-responsive">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Gender</th>
                    <th>Category</th>
                    <th>Subcategory</th>
                    <th>Percentage</th>
                    <th>Active</th>
                    <th class="text-end">Action</th>
                </tr>
            </thead>`

        response.forEach((ele, i) => {
            htmlRender += `
            <tr>
            <td>${i + 1}</td>
            <td><b>${ele.category}</b></td>
            <td>${ele.subcategory}</td>
            <td>${ele.categoryType}</td>
            <td>${ele.offerpercentage}%</td>`
            if (ele.active) {
                htmlRender += `<td class="alert-success">${ele.active}</td>`
            } else {
                htmlRender += `<td class="alert-danger">${ele.active}</td>`
            }
            htmlRender += `<td class="text-end">
                `
            if (ele.active) {
                htmlRender += `<button class="btn" onclick="deactivateOffer('${ele.categoryType}')">Deactivate</button>`
            } else {
                htmlRender += `<button class="btn" onclick="activateOffer('${ele.categoryType}')">activate</button>`
            }
            htmlRender += `<button class="btn" style="color:red" onclick="deleteOffer('${ele.categoryType}')">Del</button>
            </td>
        </tr>
            `
        })
        return res.json({ ok: true, data: htmlRender })
    }
    return res.status(400).json({ ok: false, data: "Error Getting Category Offers!" })
}

const httpCategoryOffer = async (req, res) => {
    let isOfferApplied
    const isCreated = await createCategoryOffer(req.body).catch(err => err)

    if (isCreated)
        isOfferApplied = await productOfferApply(isCreated).catch(err => err)
    if (isOfferApplied)
        return res.json({ ok: true, data: "Created Offer" })

    return res.status(400).json({ ok: false, data: "Error on Updating Products!" })
}

const httpDeleteCategoryOffer = async (req, res) => {
    const categoryType = req.body.categoryType
    const hasDeleted = await deleteCategoryOffer(categoryType).catch(err=>err)

    if(hasDeleted){
        const hasProductUpdated = await productOfferClear(categoryType).catch(err=>err)
        return res.json({ok:true,data:'Deleted Offer and Updated Products'})
    }
    return res.status(400).json({ok:false,data:'Error'})
}

module.exports = {
    httpOfferPage: httpOfferPage,
    httpCategoryOffer: httpCategoryOffer,
    httpGetAllCategoryOffer: httpGetAllCategoryOffer,
    httpDeleteCategoryOffer: httpDeleteCategoryOffer
}