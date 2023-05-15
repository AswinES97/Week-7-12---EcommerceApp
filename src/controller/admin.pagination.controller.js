const { orderPagination } = require("../models/order.model")
const { productsPagination } = require("../models/products.model")
const { formatCurrency } = require("../services/currencyFormatter")
const { formatDate } = require("./order.controller")

const orderPaginationField = async (skip, data = null) => {
    let tr = ''
    if (!data) {
        data = await orderPagination(skip).catch(err => err)
        if (!data) return false
        skip += 1
    } else {
        skip = 1
    }

    data.forEach(ele => {
        tr += `
            <tr>
            <td>${skip++}</td>
            <td>${ele.orderId}</td>
            <td>${formatCurrency(ele.totalPrice)}</td>`
        if (ele.orderStatus === 'Delivered') {
            tr += `<td><span class="badge rounded-pill alert-success">${ele.orderStatus}</span></td>`
        } else {
            tr += `<td><span class="badge rounded-pill alert-warning">${ele.orderStatus}</span></td>`
        }
        if (ele.orderDate) {
            tr += `<td>${formatDate(new Date(ele.orderDate), 'MMMM do, yyy')}</td>`
        } else {
            tr += `<td>${formatDate(new Date(ele.createdAt), 'MMMM do, yyy')}</td>`
        }
        if (ele.payment_status === 'Success') {
            tr += `<td><b class="badge rounded-pill alert-success">${ele.payment_status}</b></td>`
        } else {
            tr += `<td><b class="badge rounded-pill alert-warning">${ele.payment_status}</b></td>`
        }
        tr += `<td class="text-end">
                <a href="/v1/admin/orders/single?oId=${ele.orderId}" class="btn btn-md rounded font-sm" >Detail</a>
            </td>
        </tr>
            `
    })
    return tr
}

const productsPaginationField = async (skip, products = null) => {
    let filed = ''
    
    if(!products){
        products = await productsPagination(skip).catch(err => err)
    }
    if (products.length != 0) {
        skip += 1
        for (i = 0; i < products.length; i++) {
            filed += `
            <article class="itemlist">
                <div class="row align-items-center">
                    <div class="col col-check flex-grow-0">
                        <div class="form-check">
                            <span>${skip++}</span>
                        </div>
                    </div>
                    <div class="col-lg-4 col-sm-4 col-8 flex-grow-1 col-name">
                        <a class="itemside" href="#">
                            <div class="left">
                                <img src="${products[i].image[0]}" class="img-sm img-thumbnail" alt="Item">
                            </div>
                            <div class="info">
                                <h6 class="mb-0">${products[i].name.substring(0, 20)}...</h6>
                            </div>
                        </a>
                    </div>
                    <div class="col-lg-2 col-sm-2 col-4 col-price "> <span>${formatCurrency(products[i].price)}</span> </div>
                    <div class="col-lg-2 col-sm-2 col-4 col-status">`
            if (products[i].active) {
                filed += `<span class="badge rounded-pill alert-success">Active</span>`
            } else {
                filed += `<span class="badge rounded-pill alert-danger">Disabled</span>`
            }
            filed += `</div>
                    <div class="col-lg-1 col-sm-2 col-4 col-date">
                        <span class="ms-4">${products[i].quantity.quantity}</span>
                    </div>
                    <div class="col-lg-2 col-sm-2 col-4 col-action text-end">
                        <a href="/v1/admin/products/${products[i].pId}" class="btn btn-sm font-sm rounded btn-brand">
                            <i class="material-icons md-edit"></i> Edit
                        </a>
                        <a href="#" onclick="deleteProduct(event,'${products[i].pId}' )" class="btn btn-sm font-sm btn-light rounded">
                            <i class="material-icons md-delete_forever"></i> Delete
                        </a>
                    </div>
                </div>
            </article>
            `
        }
        return filed
    }
    else {
        return false
    }
}


const httpAdminPagination = async (req, res) => {
    let skip = Number(req.query.skip) * 10
    const type = req.query.type

    if (type === 'orders') {
        const field = await orderPaginationField(skip)
        if (!field) return res.status(400).json({ data: 'Error!', ok: false })

        return res.json({ data: field, ok: true })
    } else if (type === 'products') {
        const field = await productsPaginationField(skip)
        if (!field) return res.status(400).json({ data: 'Error!', ok: false })

        return res.json({ data: field, ok: true })
    }
}

module.exports = {
    httpAdminPagination: httpAdminPagination,
    orderPaginationField: orderPaginationField,
    productsPaginationField: productsPaginationField
}