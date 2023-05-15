const OrdersSchema = require('./orders.mong')


const totalRevenue = async () => {
    try {
        return await OrdersSchema.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$totalPrice' }
                }
            }
        ])
            .then(res => JSON.parse(JSON.stringify(res)))
            .then(res => Promise.resolve(res))

    } catch (err) {
        console.log(err);
        return Promise.reject(false)
    }
}

const getAllOrderDetails = async (userId, skip = 0) => {
    try {
        let orders = await OrdersSchema.find({ userId }, { _id: 0 }).sort({ createdAt: -1 }).skip(skip).limit(10)
        orders = JSON.parse(JSON.stringify(orders))
        return Promise.resolve(orders)
    } catch (err) {
        return Promise.reject('You have not ordered anything!')
    }
}

const getOrderDetailsAdmin = async (skip = 0) => {
    try {
        let orders = await OrdersSchema.find().sort({ createdAt: -1 }).skip(skip).limit(10)
        orders = JSON.parse(JSON.stringify(orders))
        return Promise.resolve(orders)
    } catch (err) {
        console.log(err);
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
                    _id: null,
                    orderId: { $first: "$orderId" },
                    orderStatus: { $first: "$orderStatus" },
                    cancelReason: { $first: "$cancelReason" },
                    returnReason: { $first: "$returnReason" },
                    userId: { $first: "$userId" },
                    shippingAddress: { $first: "$shippingAddress" },
                    paymentMethod: { $first: "$paymentMethod" },
                    payment_status: { $first: "$payment_status" },
                    paymentResult: { $first: "$paymentResult" },
                    totalPrice: { $first: "$totalPrice" },
                    isPaid: { $first: "$isPaid" },
                    isDelivered: { $first: "$isDelivered" },
                    createdAt: { $first: "$createdAt" },
                    updatedAt: { $first: "$updatedAt" },
                    userDetails: { $first: '$userDetails' },
                    products: {
                        $push: {
                            pId: '$products.pId',
                            quantity: '$products.quantity',
                            size: '$products.size',
                            boughtPrice: '$products.boughtPrice',
                        }
                    },
                    productDetails: {
                        $push: {
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

const getMonthlyDataForAdmin = async () => {
    try {
        return await OrdersSchema.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' },
                    },
                    value: { $sum: 1 },
                }
            },
            {
                $project: {
                    country: {
                        $switch: {
                            branches: [
                                { case: { $eq: ["$_id.month", 1] }, then: "January" },
                                { case: { $eq: ["$_id.month", 2] }, then: "February" },
                                { case: { $eq: ["$_id.month", 3] }, then: "March" },
                                { case: { $eq: ["$_id.month", 4] }, then: "April" },
                                { case: { $eq: ["$_id.month", 5] }, then: "May" },
                                { case: { $eq: ["$_id.month", 6] }, then: "June" },
                                { case: { $eq: ["$_id.month", 7] }, then: "July" },
                                { case: { $eq: ["$_id.month", 8] }, then: "August" },
                                { case: { $eq: ["$_id.month", 9] }, then: "September" },
                                { case: { $eq: ["$_id.month", 10] }, then: "October" },
                                { case: { $eq: ["$_id.month", 11] }, then: "November" },
                                { case: { $eq: ["$_id.month", 12] }, then: "December" }
                            ],
                            default: "Unknown"
                        }
                    },
                    value: 1,
                    _id: 0
                }
            }, {
                $sort: {
                    country: -1,
                }
            }
        ])
            .then(res => JSON.parse(JSON.stringify(res)))
            .then(res => Promise.resolve(res))

    } catch (err) {
        console.log(err);
        return Promise.reject(false)
    }
}

const changeOrderStatus = async (data) => {
    const orderId = Number(data.orderId)
    try {
        return await OrdersSchema.findOneAndUpdate({ orderId: orderId }, {
            $set: {
                orderStatus: data.orderStatus
            }
        })
            .then(res => Promise.resolve())
    } catch (err) {
        return Promise.reject()
    }
}

const orderPagination = async (skip) => {
    let orders = await getOrderDetailsAdmin(skip)
    if (!orders) return Promise.reject(false)

    orders = orders.map(ele => {
        return {
            orderId: ele.orderId,
            orderStatus: ele.orderStatus,
            userId: ele.userId,
            totalPrice: ele.totalPrice,
            orderDate: ele.createdAt,
            payment_status: ele.payment_status
        }
    })
    return Promise.resolve(orders)
}

const cancelOrder = async (data) => {
    try {
        return await OrdersSchema.findOneAndUpdate({ orderId: data.oId }, {
            $set: {
                orderStatus: 'Cancled',
                cancelReason: data.msg
            }
        }, { new: true })
            .then(res => JSON.parse(JSON.stringify(res)))

    } catch (err) {
        console.log(err);
        return Promise.reject(false)
    }
}

const orderReturn = async (data) => {
    try {
        return await OrdersSchema.findOneAndUpdate({ orderId: data.oId }, {
            $set: {
                orderStatus: 'Returned'
            }
        }, { new: true }).then(res => JSON.parse(JSON.stringify(res)))
    } catch (err) {
        console.log(err);
        return Promise.reject(false)
    }
}

const orderSearch = async (orderId) => {
    try {
        return await OrdersSchema.find({ orderId: orderId }, { _id: 0 })
            .then(res => JSON.parse(JSON.stringify(res)))
    } catch (err) {
        console.log(err)
        return Promise.reject(false)
    }
}

const getOrderDetailsForReport = async (startDate, endDate) => {
    startDate = new Date(startDate)
    endDate = new Date(endDate)

    try {
        return await OrdersSchema.find({
            createdAt: {
                $gte: startDate,
                $lte: endDate
            }
        })
        .then(res=>JSON.parse(JSON.stringify(res)))
        
    } catch (err) {
        console.log(err)
        return Promise.reject(false)
    }

}

module.exports = {
    totalRevenue: totalRevenue,
    getAllOrderDetails: getAllOrderDetails,
    getOrderDetailsAdmin: getOrderDetailsAdmin,
    getOrderCount: getOrderCount,
    orderPagination: orderPagination,
    singleOrderAggreated: singleOrderAggreated,
    changeOrderStatus: changeOrderStatus,
    getSingleOrder: getSingleOrder,
    cancelOrder: cancelOrder,
    orderReturn: orderReturn,
    getMonthlyDataForAdmin: getMonthlyDataForAdmin,
    orderSearch: orderSearch,
    getOrderDetailsForReport: getOrderDetailsForReport
}

