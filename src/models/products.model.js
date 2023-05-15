const product = require('./products.mongo')
const cloudinary = require('cloudinary').v2;
const slugify = require('slugify')
const { v4: uuidv4 } = require('uuid');


const deletImageFromCloud = async (pId) => {
    await getSingleProduct(pId)
        .then(async data => {
            const imgLink = data.image
            for (let i = 0; i < imgLink.length; i++) {
                let imgName = imgLink[i].split('/')
                imgName = imgName[imgName.length - 1]
                imgName = imgName.split('.')
                await cloudinary.uploader.destroy(`products/${imgName[0]}`)
            }
        })
}

const getAllProductsAdmin = (skip = 0) => {
    return new Promise(async (resolve, reject) => {
        await product.find().skip(skip).limit(10)
            .then(res => JSON.parse(JSON.stringify(res)))
            .then(data => resolve(data))
            .catch(err => reject(false))
    })
}

const getSingleProduct = (pId) => {
    return new Promise(async (resolve, reject) => {
        await product.findOne({ pId: pId })
            .then(res => JSON.parse(JSON.stringify(res)))
            .then(data => {
                resolve(data)
            })
    })
}

const productsPagination = async (skip) => {
    const products = await getAllProductsAdmin(skip).catch(err => err)
    if (products.length != 0) return Promise.resolve(products)
    else return Promise.reject(false)
}

const productSearch = async (data) => {
    try {
        return await product.find({ name: { $regex: data, $options: "i" } }).then(res => JSON.parse(JSON.stringify(res)))
    } catch (err) {
        console.log(err)
        return Promise.reject(false)
    }
}

module.exports = {

    categoryFilterCount: async (category) => {
        try {
            return product.countDocuments({ category: category, active: true, 'quantity.quantity': { $gt: 0 } })
        } catch (err) {
            console.log(err)
            return Promise.reject(false)
        }
    },

    getAllProducts: (skip = 0) => {
        return new Promise(async (resolve, reject) => {
            await product.find({ active: true, 'quantity.quantity': { $gt: 0 } }).skip(skip).limit(10)
                .then(res => JSON.parse(JSON.stringify(res)))
                .then(data => resolve(data))
                .catch(err => reject(err))
        })
    },

    addNewProduct: (productData, imageLink) => {
        return new Promise(async (resolve, reject) => {
            const productId = uuidv4()
            const slug = slugify(`${productData.name} ${productData.brand}`, { lower: true, replacement: '_' })
            let active = (productData.active === 'true')

            try {
                const Product = await new product({
                    name: productData.name,
                    pId: productId,
                    slug,
                    price: Number(productData.price),
                    brand: productData.brand.toUpperCase(),
                    description: productData.description,
                    gender: productData.gender,
                    category: productData.category,
                    subcategory: productData.subCategory,
                    categoryType: productData.categoryType,
                    active: active,
                    image: imageLink,
                    quantity: {
                        size: productData.size,
                        color: productData.color,
                        quantity: Number(productData.quantity)
                    }
                })
                Product.save(err => {
                    if (err) {
                        reject()
                    }
                    resolve()
                })

            } catch (error) {
                reject("mongo error")
            }

        })
    },

    productCount: async () => {
        try {
            return product.countDocuments()
        } catch (err) {
            console.log(err);
            return Promise.reject(false)
        }
    },

    editProduct: (pId, productData, imgLink) => {
        return new Promise(async (resolve, reject) => {
            let active = (productData.active === 'true')

            if (imgLink.length != 0) {
                await deletImageFromCloud(pId)
            } else {
                imgLink = undefined
            }

            try {
                await product.findOneAndUpdate({ pId }, {
                    $set: {
                        name: productData.name,
                        price: Number(productData.price),
                        brand: productData.brand,
                        description: productData.description,
                        gender: productData.gender,
                        category: productData.category,
                        subcategory: productData.subcategory,
                        categoryType: productData.categoryType,
                        image: imgLink,
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

    deleteProduct: (pId) => {
        return new Promise(async (resolve, reject) => {

            await deletImageFromCloud(pId)

            await product.deleteOne({ pId })
                .then(data => {
                    if (data.deletedCount == 1)
                        resolve(true)
                    else
                        resolve(false)
                })
        })
    },

    updateProductCategory: async (data) => {
        try {
            await product.updateMany({ categoryType: data.previousCategoryType }, {
                $set: {
                    categoryType: data.categoryType
                }
            })
                .then(res => Promise.resolve(true))
        } catch (err) {
            console.log(err);
            return Promise.reject(false)
        }
    },

    inactiveAllProducts: async (categoryType) => {
        try {
            await product.updateMany({
                categoryType: categoryType
            }, {
                $set: {
                    active: false,
                    categoryType: ''
                }
            })
                .then(res => console.log(res))
        } catch (err) {
            console.log(err)
        }
    },

    productOfferApply: async (data) => {
        try {
            return await product.updateMany({
                category: data.category,
                subcategory: data.subcategory,
                categoryType: data.categoryType
            }, [
                { $set: { offerpercentage: data.offerpercentage } },
                {
                    $set: {
                        offerprice: {
                            $floor: {
                                $multiply: ['$price', {
                                    $subtract: [
                                        1, {
                                            $divide: [data.offerpercentage, 100]
                                        }
                                    ]
                                }]
                            }
                        }
                    }
                }
            ])
                .then(res => Promise.resolve(true))

        } catch (err) {
            console.log(err);
            return Promise.reject(false)
        }

    },

    productOfferClear: async (categoryType) => {
        try {
            return await product.updateMany({ categoryType: categoryType }, {
                $set: {
                    offerpercentage: null,
                    offerprice: null,
                }
            })
                .then(res => Promise.resolve(true))
        } catch (err) {
            console.log(err);
            return Promise.reject(false)
        }
    },

    productWithCategory: async (category, skip = 0) => {
        try {
            return await product.find({ category: category, active: true }).skip(skip).limit(10).then(res => JSON.parse(JSON.stringify(res)))
        } catch (err) {
            console.log(err);
            return Promise.reject([])
        }
    },

    shopCategoryFilter: async (data) => {
        try {
            return await product.find({ category: data.category, categoryType: data.categoryType }).then(res => JSON.parse(JSON.stringify(res)))
        } catch (err) {
            console.log(err)
            return Promise.reject(false)
        }
    },

    productSearch,
    getAllProductsAdmin,
    productsPagination,
    getSingleProduct,
    uuidv4
}
