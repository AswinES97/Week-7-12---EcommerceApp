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
            adminTrue: req.session.admin
        })
    },

    httpGetProductEditPage: async (req, res) => {
        const slug = req.params.id

        if (slug) {
            await getSingleProduct(slug)
                .then(data => {
                    if (data)
                        return res.render('admin/admin-update-product', {
                            layout: 'admin/admin-layout',
                            adminTrue: req.session.admin,
                            data
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
                    adminTrue: req.session.admin,
                    data
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
        const slug = req.params.id
        const imgLink = req.files.map(data => data.path)

        if (slug && req.body) {
            await editProduct(slug, req.body, imgLink)
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
        const slug = req.params.id

        if (slug) {
            await deleteProduct(slug)
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