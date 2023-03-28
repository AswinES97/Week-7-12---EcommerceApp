const { reservationsUrl } = require('twilio/lib/jwt/taskrouter/util')
const cartSchema = require('./cart.mongo')

module.exports = {
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
                                userId,
                                grandTotal: Number(grandTotal)
                            },
                            $push: {
                                product: [{
                                    pId: Number(pId),
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
                                pId: Number(pId),
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
    }
}