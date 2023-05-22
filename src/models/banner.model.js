const BannerSchema = require('./banner.mongo')

const getAllBanner = async () => {
    try {
        return await BannerSchema.find().then(res => JSON.parse(JSON.stringify(res)))
    } catch (err) {
        console.log(err)
        return Promise.reject(false)
    }
}

const getAllActiveBanner = async () => {
    try {
        return await BannerSchema.find({ isActive: true }).then(res => JSON.parse(JSON.stringify(res)))
    } catch (err) {
        console.log(err)
        return Promise.reject(false)
    }
}

const addNewBanner = async (data, file) => {
    try {
        const newBanner = await new BannerSchema({
            text1: data.text1,
            text2: data.text2,
            text3: data.text3,
            text4: data.text4,
            image: file.path
        })
        return newBanner.save().then(res => res)
    } catch (err) {
        console.log(err)
        return Promise.reject(false)
    }
}

const toggleBaner = async (text1, bool) => {
    try {
        return await BannerSchema.updateOne({ text1: text1 }, {
            $set: {
                isActive: bool
            }
        }).then(res => {
            if (res.modifiedCount === 1) return true
            return false
        })
    } catch (err) {
        console.log(err)
        return Promise.reject(false)
    }
}

const deleteBanner = async (text1) => {
    try {
        return await BannerSchema.deleteOne({ text1: text1 })
    } catch (err) {
        console.log(err)
        return Promise.reject(false)
    }
}

const getSingleBanner = async (text1) => {
    try {
        return await BannerSchema.findOne({ text1: text1 })
    } catch (err) {
        console.log(err)
        return Promise.reject(false)
    }
}

module.exports = {
    getAllBanner: getAllBanner,
    addNewBanner: addNewBanner,
    toggleBaner: toggleBaner,
    deleteBanner: deleteBanner,
    getSingleBanner: getSingleBanner,
    getAllActiveBanner:getAllActiveBanner
}