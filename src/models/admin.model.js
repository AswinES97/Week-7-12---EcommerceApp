const adminSchema = require('./admin.mongo')
const userSchema = require('./user.mongo')

module.exports = {

    getAdminDetails: (userData) => {
        return new Promise(async (resolve, reject) => {
            await adminSchema.findOne({ email: userData.email })
                .then(response => {
                    if (!response)
                        reject(false)
                    resolve(response)
                })
        })
    },

    getAllUsers: () => {
        return new Promise(async (resolve, reject) => {
            await userSchema.find()
                .then(response => {
                    if (!response)
                        reject(false)
                    resolve(response)
                })
        })
    },
    
    userAccess: (id, access) => {
        return new Promise(async(resolve,reject)=>{
            await userSchema.findOneAndUpdate({_id:id},{$set:{access:access}},{new:true})
                .then(response=>{
                    resolve(response.access)
                })
        })
    }
}