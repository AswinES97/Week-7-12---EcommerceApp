const userSchema = require('./user.mongo')

module.exports = {

    loginUserWithPhone: (phn_no) => {
        return new Promise(async (resolve, reject) => {
            await userSchema.findOne({ phn_no: phn_no })
                .then(data => {
                    if(!data)
                        reject(false)
                    resolve(data)
                })
        })
    },

    loginUserWithEmailAndPassword: (userData) => {
        return new Promise(async (resolve, reject) => {
            await userSchema.findOne({ email: userData.email })
                .then(data=>{
                    if(!data)
                        reject(false)
                    resolve(data)
                })
        })
    },

    addNewUser: (phn_no) => {
        return new Promise(async (resolve, reject) => {
            try {

                const user = await userSchema.create({
                    phn_no: phn_no,
                    access: true
                })
                // user.save()
                resolve()

            } catch (error) {

                reject()

            }

        })
    }

}