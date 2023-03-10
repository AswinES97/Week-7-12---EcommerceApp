const {
    getAllProducts,
    addNewProduct,
    editProduct,
    deleteProduct,
    getSingleProduct
} = require("../../../models/products.model")

module.exports = {
    httpGetAddProductPage: (req, res) => {
        res.render('admin/admin-add-product', {
            layout: 'admin/admin-layout',
            adminTrue:req.session.admin 
        })
    },

    httpGetProductEditPage: async (req, res) => {
        let id = req.params.id
        if (id.length == 24) {
            await getSingleProduct(id)
                .then(data => {
                    if (data)
                        return res.render('admin/admin-update-product', {
                            layout: 'admin/admin-layout',
                            adminTrue:req.session.admin ,
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
                    adminTrue:req.session.admin ,
                    data
                })
            })
            .catch(err => {
                res.status(404).json({ err })
            })
    },

    httpAddNewProduct: async (req, res) => {
        let image = req.files.map(element=>element.filename)
        await addNewProduct(req.body,image)
            .then(() => {
                return res.json({'ok':'product added'})
            })
            .catch((err) => {
                return res.status(400).json(err)
            })
    },

    httpEditProduct: async (req, res) => {
        let id = req.params.id
        if (id.length == 24 && req.body) {
            await editProduct(id, req.body)
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
        const id = req.params.id
        if (id.length == 24) {
            await deleteProduct(id)
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