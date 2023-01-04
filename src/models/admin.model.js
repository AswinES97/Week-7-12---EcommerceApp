const adminSchema = require('./admin.mongo')
const userSchema = require('./user.mongo')
module.exports = {
    getAdminDetails: (userData) => {
        return new Promise(async (resolve, reject) => {
            await adminSchema.findOne({ email: userData.email })
                .then(data => {
                    if (!data)
                        reject(false)
                    resolve(data)
                })
        })
    },
    getAllUsers: () => {
        return new Promise(async (resolve, reject) => {
            await userSchema.find()
                .then(data => {
                    if (!data)
                        reject(false)
                    resolve(data)
                })
        })
    }
}