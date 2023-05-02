const { formatCurrency } = require('../services/currencyFormatter');
const cartSchema = require('./cart.mongo')

module.exports = {
    cartCount: async (userId) => {
        try {
            const cartDoc = await cartSchema.findOne({ userId: userId }).then(res => JSON.parse(JSON.stringify(res)))
            const count = cartDoc?.product?.length
            return count != null ? Promise.resolve(count) : Promise.resolve(0)
        } catch (err) {
            console.log(err);
            return Promise.reject(false)
        }
    },

    getCartProducts: async (userId) => {
        try {
            return await cartSchema.aggregate([
                {
                    $match: {
                        userId: userId
                    }
                }, {
                    $unwind: '$product'
                }, {
                    $lookup: {
                        from: 'products',
                        localField: 'product.pId',
                        foreignField: 'pId',
                        as: 'productDetails'
                    }
                }, {
                    $project: {
                        '_id': 0,
                        'product': 1,
                        'grandTotal': 1,
                        'productDetails': 1
                    }
                }
            ])
                .then(res => JSON.parse(JSON.stringify(res)))
                .then(res => {
                    if (res.length > 0) {
                        const cur = formatCurrency(res[0].grandTotal)
                        res.forEach(ele => {
                            ele.product.subTotal = formatCurrency(ele.product.subTotal)
                        });
                        const data = {
                            product: res,
                            grandTotal: cur
                        }
                        return Promise.resolve(data)
                    }
                    else return Promise.resolve(res)
                })
        } catch (err) {
            return Promise.reject(err)
        }
    },

    getCartItems: async (userId) => {
        try {
            return await cartSchema.findOne({ userId: userId })
                .then(res => Promise.resolve(JSON.parse(JSON.stringify(res))))
        } catch (err) {
            return Promise.reject("Error")
        }
    },

    addToCart: async (data) => {
        try {
            const { userId, size, quantity, subTotal, pId } = data
            return await cartSchema.findOne({ userId })
                .then(res => {
                    if (!res) return false
                    else return res
                })
                .then(async res => {
                    // already exist
                    if (!res) return false
                    else {
                        const present = res.product.find(item => item.pId == pId)
                        if (present) {
                            return await cartSchema.findOneAndUpdate({ userId, 'product.pId': pId }, {
                                $inc: {
                                    grandTotal: Number(subTotal),
                                    'product.$.quantity': Number(quantity),
                                    'product.$.subTotal': Number(subTotal),
                                }

                            }, { new: true })
                                .then(res => {
                                    return res
                                })
                        } else {
                            return await cartSchema.findOneAndUpdate({ userId: userId }, {
                                $inc: { grandTotal: Number(subTotal) }
                                ,
                                $push: {
                                    product: [{
                                        pId: pId,
                                        size,
                                        quantity: Number(quantity),
                                        subTotal: Number(subTotal),
                                    }]
                                }
                            }, { new: true })
                                .then(res => {
                                    return res
                                })
                        }
                    }
                })
                .then(async res => {
                    if (res) return Promise.resolve(res)
                    else {
                        const cartNew = await new cartSchema({
                            userId,
                            product: [{
                                pId: pId,
                                size,
                                quantity: Number(quantity),
                                subTotal: Number(subTotal),
                            }],
                            grandTotal: Number(subTotal)
                        })
                        return cartNew.save()
                            .then(res => {
                                return Promise.resolve(res)
                            })
                    }
                })

        } catch (err) {
            return Promise.reject(false)
        }
    },

    updateProductInCart: async (data, userId) => {
        let { pId, quantity, price } = data
        quantity = Number(quantity)
        price = Number(price)
        try {
            return await cartSchema.findOneAndUpdate({ userId, 'product.pId': pId }, {
                $inc: {
                    grandTotal: price,
                    'product.$.quantity': quantity,
                    'product.$.subTotal': price
                }
            }, { new: true })
                .then(res => JSON.parse(JSON.stringify(res)))
                .then(res => {
                    const product = res.product.find(ele => ele.pId === pId)
                    const data = {
                        quantity: product.quantity,
                        subTotal: formatCurrency(product.subTotal),
                        grandTotal: formatCurrency(res.grandTotal)
                    }
                    return Promise.resolve(data)
                })
                .catch(err => { throw Error() })
        } catch (err) {
            return Promise.reject()
        }
    },

    removeFromCart: async (data) => {
        const { pId, userId, price } = data

        try {
            return await cartSchema.findOneAndUpdate(
                { userId },
                {
                    $inc: { grandTotal: -price },
                    $pull: { product: { pId: pId } }
                }, { new: true })
                .then(res => JSON.parse(JSON.stringify(res)))
                .then(res => {
                    return Promise.resolve(res)
                })
        } catch (err) {
            return Promise.reject(false)
        }

    },

    deleteAllProducts: async (userId) => {
        try {
            await cartSchema.deleteOne({ userId })
                .then(res => {
                    if (res.deletedCount === 1) return Promise.resolve(true)
                    else return Promise.reject(false)
                })

        } catch (err) {
            return Promise.reject(false)
        }

    }

}