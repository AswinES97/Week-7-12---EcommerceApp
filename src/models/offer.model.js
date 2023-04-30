const OfferSchema = require('./offer.mongo')

const getAllCategoryOffer = async () => {
    try {
        const res = await OfferSchema.find({categoryType:{$exists:true}},{_id:0}).then(res=>JSON.parse(JSON.stringify(res)))
        return Promise.resolve(res)
    } catch (err) {
        console.log(err);
        return Promise.reject(false)
    }
}

const createCategoryOffer = async (data) => {
    try {
        const [checkOffer] = await OfferSchema.find({ category: data.Gender, subcategory: data.subCategory, categoryType: data.categoryType })
        if (checkOffer) return Promise.reject(false)

        const offerDbCreate = await new OfferSchema({
            category: data.Gender,
            subcategory: data.subCategory,
            categoryType: data.categoryType,
            offerpercentage: Number(data.percentage)
        })
        return await offerDbCreate.save()
            .then(res => JSON.parse(JSON.stringify(res)))
            .then(res => Promise.resolve(res))

    } catch (err) {
        console.log(err);
        return Promise.reject(false)
    }
}

const deleteCategoryOffer = async (categoryType)=>{
    try {
        return await OfferSchema.deleteOne({categoryType:categoryType})
        .then(res=>{
            if(res.deletedCount === 1) return Promise.resolve(true)
            return Promise.reject(false)
        })
    } catch (err) {
        console.log(err);
        return Promise.reject(false)
    }
}

module.exports = {
    createCategoryOffer: createCategoryOffer,
    getAllCategoryOffer: getAllCategoryOffer,
    deleteCategoryOffer: deleteCategoryOffer
}