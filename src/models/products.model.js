const product = require('./products.mongo')

module.exports = {
    getAllProducts: () => {
        return new Promise(async (resolve, reject) => {
            await product.find()
                .then(data => resolve(data))
                .catch(err => reject(err))
        })
    },

    getSingleProduct: (id) => {
        return new Promise(async (resolve, reject) => {
            await product.findOne({ _id: id })
                .then(data => {
                    resolve(data)
                })
        })
    },

    addNewProduct: (productData,image) => {
        return new Promise(async (resolve, reject) => {
            let active = (productData.active === 'true')
            try {
                await product.create({
                    name: productData.name,
                    price: Number(productData.price),
                    brand: productData.brand,
                    description: productData.description,
                    gender: productData.gender,
                    category: productData.category,
                    subcategory: productData.subcategory,
                    active: active,
                    image: image,
                    quantity: {
                        size: productData.size,
                        color: productData.color,
                        quantity: Number(productData.quantity)
                    }
                })
                    .then((data) => {
                        resolve()
                    })
                    .catch(() => {
                        reject("Product Not Added")
                    })

            } catch (error) {
                reject("mongo error")
            }

        })
    },

    editProduct: (id, productData) => {
        return new Promise(async (resolve, reject) => {
            let active = (productData.active === 'true')
            try {
                await product.findOneAndUpdate({ _id: id }, {
                    $set: {
                        name: productData.name,
                        price: Number(productData.price),
                        brand: productData.brand,
                        description: productData.description,
                        gender: productData.gender,
                        category: productData.category,
                        subcategory: productData.subcategory,
                        active: active,
                        quantity: {
                            size: productData.size,
                            color: productData.color,
                            quantity: Number(productData.quantity)
                        }
                    }
                })
                    .then((data) => {
                        if (data)
                            resolve()
                        reject()
                    })
            } catch (error) {
                reject('mongo not updated')
            }

        })
    },

    deleteProduct: (id) => {
        return new Promise(async (resolve, reject) => {
            await product.deleteOne({ _id: id })
                .then(data => {
                    console.log(data);
                    if (data.deletedCount == 1)
                        resolve(true)
                    else
                        resolve(false)
                })
        })
    }
}