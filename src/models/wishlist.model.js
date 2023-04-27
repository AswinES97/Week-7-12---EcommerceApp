const wishlishtSchema = require('./wishlist.mong')

const addToWishlist = async ({ userId, slug }) => {
    let user
    let wishlist
    let hasSlug

    try {
        [user] = await wishlishtSchema.find({ userId })
        if (user === undefined) {
            wishlist = await new wishlishtSchema({
                userId: userId,
                products: [slug]
            })
            return wishlist.save()
                .then(res => Promise.resolve(true))
        }

        hasSlug = user.products.includes(slug)
        if (hasSlug) return Promise.reject(false)

        return await wishlishtSchema.updateOne({ userId: userId }, {
            $push: {
                products: slug
            }
        })
            .then(res => Promise.resolve(true))

    } catch (err) {
        console.log(err)
        return Promise.reject(false)
    }

}

const getWishlistData = async (userId) => {
    try {
        return await wishlishtSchema.aggregate([
            {
                $match: {
                    userId: "1234"
                }
            },
            {
                $unwind: {
                    path: "$products",
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "products",
                    foreignField: "slug",
                    as: "productDetails"
                }
            },
            {
                $unwind: {
                    path: '$productDetails',

                }
            },
            {
                $group: {
                    _id: "$_id",
                    userId: {
                        $first: "$userId"
                    },
                    products: {
                        $push: "$products"
                    },
                    productDetails: {
                        $push: {
                            pId: "$productDetails.pId",
                            images: "$productDetails.image",
                            name: "$productDetails.name",
                            slug: "$productDetails.slug",
                            price: "$productDetails.price",
                            quantity: "$productDetails.quantity",

                        }
                    }
                }
            }
        ])
            .then(res => JSON.parse(JSON.stringify(res)))
            .then(res =>{ 
                if(res.length === 0) return Promise.reject(false)
                return Promise.resolve(res)
            })
    } catch (err) {
        console.log(err);
        return Promise.reject(false)
    }
}

const removeFormWishlist = async ({ userId, slug }) => {
    try {
        const res = await wishlishtSchema.updateOne({ userId: userId }, {
            $pull: {
                products: slug
            }
        })

        if(res.modifiedCount === 1)  return Promise.resolve(true)
        return Promise.reject(false)

    } catch (err) {
        console.log(err);
        return Promise.reject(false)
    }
}

module.exports = {
    addToWishlist: addToWishlist,
    getWishlistData: getWishlistData,
    removeFormWishlist: removeFormWishlist
}