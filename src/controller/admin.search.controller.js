const { orderSearch } = require("../models/order.model")
const { productSearch } = require("../models/products.model")
const { orderPaginationField, productsPaginationField } = require("./admin.pagination.controller")



const httpAdminSearchController = async (req, res) => {
    const query = req.query
    
    if (query.type === 'orders') {
        const response = await orderSearch(query.value).catch(err => err)
        if (response.length != 0) {
            const data = await orderPaginationField(null,response)
            return res.json({ ok: true, data: data })
        }
    }

    if(query.type === 'products'){
        const response = await productSearch(query.value).catch(err=>err)
        if(response.length !=0 ){
            const data = await productsPaginationField(null,response)
            return res.json({ ok: true, data: data })
        }
    }
    
    return res.status(400).json({ ok: false })
}

module.exports = {
    httpAdminSearchController: httpAdminSearchController
}