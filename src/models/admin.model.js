const adminSchema = require('./admin.mongo')

module.exports = {
    getAdminDetails: (userData) => {
        return new Promise(async (resolve, reject) => {
            await adminSchema.findOne({ email: userData.email })
                .then(data=>{
                    if(!data)
                        reject(false)
                    resolve(data)
                })
        })
    }
}