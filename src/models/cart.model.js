const cartSchema = require('./cart.mongo')

module.exports = {
    getCartProducts: async (userId) => {
        try {
            await cartSchema.findOne({ userId })
                .populate("product.pId")
                .then(res => {
                    if (res.length > 0) {
                        console.log(res.product);
                    }
                    else return Promise.reject(false)
                })
        } catch (err) {
            return Promise.reject(err)
        }
    },

    addToCart: async (data) => {
        try {
            const { userId, pId, quantity, subTotal, grandTotal } = data
            return await cartSchema.findOne({ userId: userId })
                .then(res => {
                    if (!res) return false
                    else return true
                })
                .then(async res => {
                    // already exist
                    if (!res) return false
                    else {
                        return await cartSchema.updateOne({ userId: userId }, {
                            $set: {
                                grandTotal: Number(grandTotal)
                            },
                            $push: {
                                product: [{
                                    pId: pId,
                                    quantity: Number(quantity),
                                    subTotal: Number(subTotal),
                                }]
                            }
                        })
                            .then(res => {
                                return true
                            })
                    }
                })
                .then(async res => {
                    if (res) return Promise.resolve(res)
                    else {
                        const cartNew = await new cartSchema({
                            userId,
                            product: [{
                                pId: pId,
                                quantity: Number(quantity),
                                subTotal: Number(subTotal),
                            }],
                            grandTotal: Number(grandTotal)
                        })
                        return cartNew.save()
                            .then(res => {
                                return Promise.resolve(true)
                            })
                    }
                })

        } catch (err) {
            return Promise.reject(false)
        }
    },

    removeFromCart: async (data) => {
        const { pId, userId } = data

        try {
            return await cartSchema.updateOne(
                { userId },
                {
                    $pull: { product: { pId: pId } }
                })
                .then(res => {
                    if (res.modifiedCount < 1) return Promise.reject(false)
                    else return Promise.resolve(true)
                })


        } catch (err) {
            return Promise.reject(false)
        }

    },

    deleteAllProducts: async (data) => {
        const { userId } = data

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