const productSchema = require('../models/products.mongo')

const newAdded =async () => {
    try {
        return await productSchema.find({active:true},{_id:0,name:1,image:1,pId:1,brand:1,price:1,slug:1}).sort({createdAt:-1})
            .then(res=>JSON.parse(JSON.stringify(res)))
            .then(res=>Promise.resolve(res))
        
    } catch (err) {
        return Promise.reject(false)
    }
}

module.exports = {
    newAdded: newAdded
}