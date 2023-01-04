const { 
    getAllProducts,
    addNewProduct 
} = require("../../models/products.model")

module.exports = {
    httpGetAllProducts:async(req,res)=>{
        await getAllProducts()
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(404).json({err})
        })
    },
    httpAddNewProduct:async(req,res)=>{
        await addNewProduct(req.body)
        .then(()=>{
            return res.status(200).json({'ok':'product added'})
        })
        .catch((err)=>{
            return res.status(400).json(err)
        })
    }
}