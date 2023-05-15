const {
    getAllProductsAdmin,
    addNewProduct,
    editProduct,
    deleteProduct,
    getSingleProduct,
    productCount
} = require("../models/products.model")
const { formatCurrency } = require("../services/currencyFormatter")

module.exports = {
    httpGetAddProductPage: (req, res) => {
        res.render('admin/admin-add-product', {
            layout: 'admin/admin-layout',
            adminTrue: req.admin,
            active: 'products'
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
                            data: data,
                            active: 'products'
                        })
                    else
                        return res.status(400)
                })
        } else {
            return res.status(404)
        }
    },

    httpGetAllProducts: async (req, res) => {
        let hasProducts = true
        let buttonLength = 0
        const pCount = await productCount()
        return await getAllProductsAdmin()
            .then(data => {
                if (data.length === 0) hasProducts = false
                else {
                    console.log(data);
                    data.forEach(ele => {
                        ele.price = formatCurrency(ele.price)
                    });
                }
                buttonLength = Math.ceil(pCount / 10)

                return res.render('admin/admin-products-list', {
                    layout: 'admin/admin-layout',
                    adminTrue: req.admin,
                    data: data,
                    hasProducts: hasProducts,
                    buttonLength: buttonLength,
                    active: 'products'
                })
            })
            .catch(err => {
                res.status(400).json({ err })
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