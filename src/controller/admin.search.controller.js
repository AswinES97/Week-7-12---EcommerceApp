const { couponSearch } = require("../models/coupon.model")
const { orderSearch } = require("../models/order.model")
const { productSearch } = require("../models/products.model")
const { orderPaginationField, productsPaginationField } = require("./admin.pagination.controller")
const { formatDate } = require("./order.controller")


function couponField(data) {
    let field = `
        <tr >
            <td><b>${data.code}</b></td>
            <td><b>${data.discount}%</b></td>
            <td>${data.description}</td>
            <td>${formatDate(new Date(data.expirationDate), 'MMMM do, yyy')}</td>
            <td>${data.isActive}</td>
            <td class="text-end">`
    if (data.isActive) {
        field += `<a href="#" onclick="editCoupon(event,'${data.code}','deactivate')"><button class="btn" style="background-color: rgb(94, 66, 85);color: white;">Deactivate</button></a>`
    } else {
        field += `<a href="#" onclick="editCoupon(event,'${data.code}')"><button class="btn" style="background-color: rgb(94, 66, 85);color: white;">Activate</button></a>`
    }
    field += `<a href="#" onclick="editCoupon(event,'${data.code}','delete')"><button class="btn" style="background-color: rgba(199, 1, 1, 0.884);color: white;">Delete</button></a>
            </td>
        </tr > `
    return field
}

const httpAdminSearchController = async (req, res) => {
    const query = req.query

    if (query.type === 'orders') {
        const response = await orderSearch(query.value).catch(err => err)
        if (response.length != 0) {
            const data = await orderPaginationField(null, response)
            return res.json({ ok: true, data: data })
        }
    }

    if (query.type === 'products') {
        const response = await productSearch(query.value).catch(err => err)
        if (response.length != 0) {
            const data = await productsPaginationField(null, response)
            return res.json({ ok: true, data: data })
        }
    }

    if (query.type === 'coupon') {
        const response = await couponSearch(query.value).catch(err => err)
        if (response) {
            const data = await couponField(response)
            return res.json({ ok: true, data: data })
        }
    }

    return res.status(400).json({ ok: false })
}

module.exports = {
    httpAdminSearchController: httpAdminSearchController
}