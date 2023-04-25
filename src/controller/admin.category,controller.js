const {
    addCategoryToDb,
    getCategoryInitially,
    getCategoryType,
    getCategory,
    editCategory,
    getAllCategory,
    deleteCategory
} = require('../models/category.model');
const { inactiveAllProducts, updateProductCategory } = require('../models/products.model');

module.exports = {
    httpGetCategoryPage: (req, res) => {
        getAllCategory()
            .then(data => {
                [data] = data
                console.log(data);
                return res.render('admin/admin-category', {
                    layout: 'admin/admin-layout',
                    adminTrue: req.admin,
                    data: data,
                    id: 0
                })
            })
    },

    httpAddCategory: async (req, res) => {
        const { mainCategory, subCategory, addCategory } = req.body

        await addCategoryToDb(mainCategory, subCategory, addCategory)
            .then(() => {
                return res.json({ 'ok': 'Category Added' })
            })
            .catch(() => {
                return res.status(400).json({ 'err': 'Not Added' })
            })
    },

    httpGetCategory: (req, res) => {

        if (Object.keys(req.query).length === 0) {
            getCategoryInitially()
                .then((data) => {
                    return res.json(data)
                })
                .catch(err => {
                    return res.status(500).json('Database Error!')
                })
        } else if (Object.keys(req.query).length === 2) {
            getCategoryType(req.query)
                .then(data => {
                    return res.json(data)
                })
                .catch(err => {
                    return res.status(500).json('Database Error!')
                })
        } else {
            getCategory(req.query)
                .then((data) => {
                    return res.status(200).json(data)
                })
                .catch(err => {
                    return res.status(400).json(err)
                })
        }
    },

    httpEditCatagory: async (req, res) => {
        const response = await editCategory(req.body).catch(err => err)
        if (!response) return res.status(400).json({ ok: false, data: 'Error Updating' })
        await updateProductCategory(req.body)
        return res.json({ ok: true, data: "Updated!" })
    },

    httpDeleteCategory: async (req, res) => {
        let data

        if (!req.body.gender || !req.body.category || !req.body.categoryType) {
            return res.status(400).json({ ok: false, data: 'Invalid Input!' })
        }
        data = await deleteCategory(req.body).catch(err => err)

        if (data) {
            await inactiveAllProducts(req.body.categoryType)
            return res.json({ ok: true, data: "Deleted Category and Related Products!" })
        }
        return res.status(400).json({ ok: false, data: "Error deleting Category!" })
    }

}