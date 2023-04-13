const {
    getAllProducts,
    addNewProduct,
    editProduct,
    deleteProduct,
    getSingleProduct
} = require("../models/products.model")

module.exports = {
    httpGetAddProductPage: (req, res) => {
        res.render('admin/admin-add-product', {
            layout: 'admin/admin-layout',
            adminTrue: req.admin
        })
    },

    httpGetProductEditPage: async (req, res) => {
        const pId = req.params.id

        if (pId) {
            await getSingleProduct(pId)
                .then(data => {
                    if (data)
                        return res.render('admin/admin-update-product', {
                            layout: 'admin/admin-layout',
                            adminTrue: req.admin,
                            data : data
                        })
                    else
                        return res.status(400)
                })
        } else {
            return res.status(404)
        }
    },

    httpGetAllProducts: async (req, res) => {
        await getAllProducts()
            .then(data => {
                res.render('admin/admin-products-list', {
                    layout: 'admin/admin-layout',
                    adminTrue: req.admin,
                    data: data
                })
            })
            .catch(err => {
                res.status(404).json({ err })
            })
    },

    httpAddNewProduct: async (req, res) => {
        let imageLink = req.files.map(element => element.path)
        await addNewProduct(req.body, imageLink)
            .then(() => {
                return res.redirect('/v1/admin/products/')
            })
            .catch((err) => {
                return res.status(400).json(err)
            })
    },

    httpEditProduct: async (req, res) => {
        const pId = req.params.id
        const imgLink = req.files.map(data => data.path)

        if (pId && req.body) {
            await editProduct(pId, req.body, imgLink)
                .then(() => {
                    return res.redirect('/v1/admin/products')
                })
                .catch(err => {
                    return res.status(400).json({ '400': 'product not updated' })
                })
        } else {
            return res.status(400).json({ '400': 'no product_id or product data' })
        }
    },

    httpDeleteProduct: async (req, res) => {
        const pId = req.params.id

        if (pId) {
            await deleteProduct(pId)
                .then((status) => {
                    if (status) {
                        return res.status(200).json({ "ok": "deleted" })
                    } else {
                        return res.status(400)
                    }
                })
        }
        else {
            return res.status(400)
        }
    }
}