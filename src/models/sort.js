const productSchema = require('./products.mongo')
const orderSchema = require('./orders.mong')

const newAdded = async () => {
    try {
        return await productSchema.find({ active: true }, { _id: 0, name: 1, image: 1, pId: 1, brand: 1, price: 1, slug: 1 }).sort({ createdAt: -1 })
            .then(res => JSON.parse(JSON.stringify(res)))
            .then(res => Promise.resolve(res))

    } catch (err) {
        return Promise.reject(false)
    }
}

const popularProducts = async () => {
    try {
        return await orderSchema.aggregate([
            { $unwind: "$products" },
            {
                $group: {
                    _id: '$products.pId',
                    product_count: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    product_count: -1
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: '_id',
                    foreignField: 'pId',
                    as: 'details'
                }
            },
            {
                $unwind: {
                    path: "$details",

                }
            },
            {
                $group: {
                    _id: null,
                    productDetails: {
                        $push: {
                            pId: '$details.pId',
                            name: '$details.name',
                            slug: '$details.slug',
                            image: '$details.image',
                            price: '$details.price',
                            brand: '$details.brand'
                        }
                    }
                }
            }
        ])
            .then(res => JSON.parse(JSON.stringify(res)))
            .then(res =>Promise.resolve(res))


    } catch (err) {
        return Promise.reject(false)
    }
}

module.exports = {
    newAdded: newAdded,
    popularProducts: popularProducts
}