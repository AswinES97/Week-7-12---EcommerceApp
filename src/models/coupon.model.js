const couponSchema = require('./coupon.mongo')
const generateRandomId = require('../services/randomId')
const cron = require('cron')

const cronJob = new cron.CronJob('*/2 * * * *', async () => {
    try {
        const currentDate = new Date();
        await couponSchema.updateMany({ expirationDate: { $lt: currentDate} },{
            $set:{
                isActive: false
            }
        })
    } catch (err) {
        console.log('error deactivating offer',err);
    }
})

cronJob.start()

const getAllCoupon = async () => {
    try {
        return await couponSchema.find().then(res => JSON.parse(JSON.stringify(res)))
    } catch (err) {
        return Promise.reject(false)
    }
}

const addNewCoupon = async (data) => {
    try {
        const id = generateRandomId(5)
        const newCoupon = await new couponSchema({
            code: id,
            description: data.description,
            minPurchase: Number(data.minPurchase),
            discount: Number(data.discount),
            expirationDate: new Date(data.expiryDate),
            isActive: JSON.parse(data.active),
            createdAt: Date.now()
        })
        return newCoupon.save()

    } catch (err) {
        return Promise.reject(false)
    }
}

const toggleCoupon = async (code, data) => {
    try {
        return await couponSchema.updateOne({ code: code }, {
            $set: {
                isActive: data
            }
        }).then(res => {
            if (res.modifiedCount === 1) return true
            return false
        })
    } catch (err) {
        return Promise.reject(false)
    }
}

const deleteCoupon = async (code) => {
    try {
        return await couponSchema.deleteOne({ code: code })
    } catch (err) {
        return Promise.reject(false)
    }
}

const couponSearch = async (data) => {
    try {
        return await couponSchema.findOne({ code: data }).then(res => JSON.parse(JSON.stringify(res)))
    } catch (err) {
        return Promise.reject(false)
    }
}

module.exports = {
    addNewCoupon: addNewCoupon,
    getAllCoupon: getAllCoupon,
    toggleCoupon: toggleCoupon,
    deleteCoupon: deleteCoupon,
    couponSearch: couponSearch
}