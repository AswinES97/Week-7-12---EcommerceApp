const product = require('./products.mongo')
const cloudinary = require('cloudinary').v2;
const slugify = require('slugify')
const { v4: uuidv4 } = require('uuid');

const getSingleProduct = (slug) => {
    return new Promise(async (resolve, reject) => {
        await product.findOne({ slug })
            .then(data => {
                resolve(data)
            })
    })
}

module.exports = {
    getAllProducts: () => {
        return new Promise(async (resolve, reject) => {
            await product.find()
                .then(data => resolve(data))
                .catch(err => reject(err))
        })
    },

    getSingleProduct,

    addNewProduct: (productData, imageLink) => {
        return new Promise(async (resolve, reject) => {
            const productId = uuidv4()
            let active = (productData.active === 'true')
            const slug = slugify(`${productData.name} ${productData.brand}`, { lower: true, replacement: '_' })
            try {
                const Product = await new product({
                    name: productData.name,
                    productId,
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

    editProduct: (slug, productData, imgLink) => {
        return new Promise(async (resolve, reject) => {
            let active = (productData.active === 'true')

            if (imgLink.length != 0) {
                await deletImageFromCloud(slug)
            } else {
                imgLink = undefined
            }

            try {
                await product.findOneAndUpdate({ slug }, {
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

    deleteProduct: (slug) => {
        return new Promise(async (resolve, reject) => {

            await deletImageFromCloud(slug)

            await product.deleteOne({ slug })
                .then(data => {
                    if (data.deletedCount == 1)
                        resolve(true)
                    else
                        resolve(false)
                })
        })
    }
}

const deletImageFromCloud = async (slug) => {
    await getSingleProduct(slug)
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