const categorySchema = require('./category.mongo')



module.exports = {
    addCategoryToDb: async (mainCategory, subCategory, addCategory) => {
        try {
            await categorySchema.find()
                .then(async data => {
                    let result = null
                    if (data.length != 0) {
                        await categorySchema.updateMany({
                            $addToSet: {
                                [`${mainCategory}.${subCategory}`]: { $each: [addCategory] }
                            }
                        })
                            .then(data => {
                                if (data.acknowledged) return Promise.resolve()
                                return Promise.reject()
                            })
                    } else {
                        const add = new categorySchema({
                            [mainCategory]: {
                                [subCategory]: [addCategory]
                            }
                        })
                        await add.save().then(res => {
                            if (res) return Promise.resolve()
                            return Promise.reject()
                        })
                    }
                })
        } catch (error) {
            return Promise.reject()
        }
    },

    getCategoryInitially: async () => {
        try {
            return await categorySchema.find({}, { _id: false })
                .then(res => {
                    if (res) {
                        res = JSON.parse(JSON.stringify(res[0]))
                        const category = Object.keys(res)
                        const subCategory = Object.keys(res.Men)
                        const categoryType = res.Men.Topwear
                        const data = {
                            category,
                            subCategory,
                            categoryType
                        }
                        return Promise.resolve(data)
                    }
                    throw new Error()
                })

        } catch (err) {
            return Promise.reject('Mongo Error!')
        }
    },

    getCategory: async (data) => {
        try {
            const { category, sub_category } = data
            return await categorySchema.find({},{
                [`${category}.${sub_category}`]:1,_id:0})
                .then(res => {
                    let [data] = res
                    data = data[category][sub_category]
                    return Promise.resolve(data)
                })

        } catch (error) {
            return Promise.reject('Mongo Error!')
        }
    }
}