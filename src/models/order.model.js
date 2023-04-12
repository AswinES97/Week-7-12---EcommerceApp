const OrdersSchema = require('./orders.mong')

const getAllOrderDetails = async (userId) => {
    try {
        let orders = await OrdersSchema.find({ userId }, { _id: 0 })
        orders = JSON.parse(JSON.stringify(orders))
        return Promise.resolve(orders)
    } catch (err) {
        return Promise.reject('You have not ordered anything!')
    }
}

const getOrderDetailsAdmin = async (skip = 0) => {
    try {
        let orders = await OrdersSchema.find().skip(skip).limit(10)
        orders = JSON.parse(JSON.stringify(orders))
        return Promise.resolve(orders)
    } catch (err) {
        return Promise.reject()
    }
}

const getSingleOrder = async (orderId) => {
    try {
        return await OrdersSchema.findOne({ orderId: orderId }).then(res => JSON.parse(JSON.stringify(res)))
    } catch (err) {
        return Promise.reject()
    }
}

const singleOrderAggreated = async (orderDetails) => {
    try {
        return await OrdersSchema.aggregate([
            {
                $match: {
                    orderId: orderDetails.orderId
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: 'userId',
                    as: 'userDetails'
                }
            }, {
                $unwind: '$products'
            }, {
                $lookup: {
                    from: 'products',
                    localField: 'products.pId',
                    foreignField: 'pId',
                    as: 'productDetails'
                }
            },
            {
                $unwind: '$productDetails'
            },
            {
                $group: {
                    _id: '$_id',
                    orderId: { $first: "$orderId" },
                    orderStatus: { $first: "$orderStatus" },
                    userId: { $first: "$userId" },
                    shippingAddress: { $first: "$shippingAddress" },
                    paymentMethod: { $first: "$paymentMethod" },
                    payment_status: { $first: "$payment_status" },
                    totalPrice: { $first: "$totalPrice" },
                    isPaid: { $first: "$isPaid" },
                    isDelivered: { $first: "$isDelivered" },
                    isDelivered: { $first: "$isDelivered" },
                    updatedAt: { $first: "$updatedAt" },
                    userDetails: { $first: '$userDetails' },
                    products:{
                        $push: {
                            _id:'$products._id',
                            pId : '$products.pId',
                            quantity : '$products.quantity',
                            size: '$products.size',
                            boughtPrice:'$products.boughtPrice',
                        }
                    },
                    productDetails: {
                        $push: {
                            _id: '$_id',
                            pId: '$productDetails.pId',
                            name: '$productDetails.name',
                            slug: '$productDetails.slug',
                            price: '$productDetails.price',
                            brand: '$productDetails.brand',
                            description: '$productDetails.description',
                            gender: '$productDetails.gender',
                            category: '$productDetails.category',
                            subcategory: '$productDetails.subcategory',
                            categoryType: '$productDetails.categoryType',
                            active: '$productDetails.active',
                            image: '$productDetails.image',
                            quantity: "$productDetails.quantity"
                        }
                    },
                }
            }
        ])
            .then(res => JSON.parse(JSON.stringify(res)))
            .then(res => Promise.resolve(res))
    } catch (err) {
        console.log(err);
    }
}

const getOrderCount = async () => {
    try {
        return await OrdersSchema.countDocuments()
    } catch (err) {
        return Promise.reject('Error getting data')
    }
}

const pagination = async (skip) => {
    let orders = await getOrderDetailsAdmin(skip)

    if (!orders) return Promise.reject()

    orders = orders.map(ele => {
        return {
            orderId: ele.orderId,
            orderStatus: ele.orderStatus,
            userId: ele.userId,
            totalPrice: ele.totalPrice,
            orderDate: ele.createdAt
        }
    })
    return Promise.resolve(orders)
}

module.exports = {
    getAllOrderDetails: getAllOrderDetails,
    getOrderDetailsAdmin: getOrderDetailsAdmin,
    getOrderCount: getOrderCount,
    pagination: pagination,
    singleOrderAggreated: singleOrderAggreated,
    getSingleOrder: getSingleOrder
}

