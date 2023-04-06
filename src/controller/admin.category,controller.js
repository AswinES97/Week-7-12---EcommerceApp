const { 
    addCategoryToDb,
    getCategoryInitially,
    getCategoryType,
    getCategory
} = require('../models/category.model')

module.exports = {
    httpGetCategoryPage: (req, res) => {
        return res.render('admin/admin-category', {
            layout: 'admin/admin-layout',
            adminTrue: req.session.admin
        })
    },

    httpAddCategory: async(req, res) => {
        const { mainCategory, subCategory, addCategory } = req.body
        
        await addCategoryToDb(mainCategory, subCategory, addCategory)
            .then(()=>{
                return res.json({'ok':'Category Added'})
            })
            .catch(()=>{
                return res.status(400).json({'err':'Not Added'})
            })
    },

    httpGetCategory: (req,res)=>{

        if(Object.keys(req.query).length === 0){
            getCategoryInitially()
            .then((data)=>{
                return res.json(data)
            })
            .catch(err=>{
                return res.status(500).json('Database Error!')
            })
        }else if(Object.keys(req.query).length === 2){
            getCategoryType(req.query)
                .then(data=>{
                    return res.json(data)
                })
                .catch(err=>{
                    return res.status(500).json('Database Error!')
                })
        }else{
            getCategory(req.query)
                .then((data)=>{
                    return res.status(200).json(data)
                })
                .catch(err=>{
                    return res.status(400).json(err)
                })
        }
    }
}