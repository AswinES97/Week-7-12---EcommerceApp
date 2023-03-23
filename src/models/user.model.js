const userSchema = require('./user.mongo')

module.exports = {


    loginUserWithPhone: (phn_no) => {
        return new Promise(async (resolve, reject) => {
            await userSchema.findOne({ phn_no: phn_no })
                .then(data => {
                    if (!data) {
                        reject(false)
                    } else {
                        resolve(data)
                    }
                })
        })
    },

    loginUserWithEmailAndPassword: (userData) => {
        return new Promise(async (resolve, reject) => {
            await userSchema.findOne({ email: userData.email })
                .then(data => {
                    if (!data) return reject(false)
                    if (data.password == userData.pass) return resolve(data)
                    reject(false)
                })
        })
    },

    addNewUser: (phn_no, email, name,password) => {
        return new Promise(async (resolve, reject) => {
            try {

                const user = await userSchema.create({
                    phn_no: phn_no,
                    fname: name,
                    email: email,
                    access: true,
                    password: password
                })
                resolve(user)

            } catch (error) {
                reject()

            }

        })
    },

    getUserForVeri: (phn_no, email ) => {
        return new Promise(async (resolve, reject) => {
            return await userSchema.findOne({ $or: [{ phn_no: phn_no }, { email: email }] })
                .then(response => {
                    if (response) {
                        reject(response)
                    } else {
                        resolve(response)
                    }
                })
        })
    },

    getUser: (phn_no, id) => {
        if (phn_no) {
            return new Promise(async (resolve, reject) => {
                await userSchema.findOne({ phn_no: phn_no })
                    .then(response => {
                        if (response) {
                            resolve(response)
                        } else {
                            reject(response)
                        }
                    })
            })
        }
        if (id) {
            return new Promise(async (resolve, reject) => {
                return await userSchema.findOne({ _id: id })
                    .then(response => {
                        if (response) {
                            resolve(response)
                        } else {
                            reject(response)
                        }
                    })
            })
        }

    }


}