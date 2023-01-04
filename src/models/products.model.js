const product = require('./products.mongo')

module.exports = {
    getAllProducts: () => {
        return new Promise(async (resolve, reject) => {
            await product.find()
                .then(data => resolve(data))
                .catch(err => reject(err))
        })
    },

    addNewProduct: (productData) => {
        return new Promise(async (resolve, reject) => {
            try {
                await product.create({
                    name: productData.name,
                    price: productData.price,
                    brand: productData.brand,
                    gender: productData.gender,
                    category: productData.category,
                    subcategory: productData.subcategory,
                    quantity: {
                        size: productData.size,
                        color: productData.color,
                        quantity: productData.quantity
                    }
                })
                    .then((data) => {
                        resolve()
                    })
                    .catch(() => {
                        reject("not added")
                    })

            } catch (error) {
                reject("mongo error")
            }

        })
    }
}