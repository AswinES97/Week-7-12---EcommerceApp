const { hashPassword, checkPassword } = require('../services/bcrypt');
const userSchema = require('./user.mongo')
const { uuidv4 } = require('./products.model')

const checkUser = (phn_no, userId) => {
    if (phn_no) {
        return new Promise(async (resolve, reject) => {
            await userSchema.findOne({ phn_no: phn_no })
                .then(res => JSON.parse(JSON.stringify(res)))
                .then(response => {
                    if (response) {
                        resolve(response)
                    } else {
                        reject(response)
                    }
                })
        })
    }
    if (userId) {
        return new Promise(async (resolve, reject) => {
            return await userSchema.findOne({ userId })
                .then(res => JSON.parse(JSON.stringify(res)))
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

    loginUserWithEmailAndPassword: (userData,) => {
        return new Promise(async (resolve, reject) => {
            await userSchema.findOne({ email: userData.email })
                .then(res => JSON.parse(JSON.stringify(res)))
                .then(async data => {
                    if (!data) return reject(false)
                    const passMatch = await checkPassword(userData.pass, data.password)
                    if (passMatch) return resolve(data)
                    reject(false)
                })
        })
    },

    addNewUser: (phn_no, email, name, password) => {
        const userId = uuidv4()
        return new Promise(async (resolve, reject) => {
            try {
                const hash = await hashPassword(password)
                const user = await userSchema.create({
                    userId,
                    fname: name,
                    phn_no: phn_no,
                    email: email,
                    access: true,
                    password: hash
                })
                resolve(user)

            } catch (error) {
                reject()

            }

        })
    },

    getUserForVeri: (phn_no, email) => {
        return new Promise(async (resolve, reject) => {
            return await userSchema.findOne({ $or: [{ phn_no: phn_no }, { email: email }] })
                .then(res => JSON.parse(JSON.stringify(res)))
                .then(response => {
                    if (response) {
                        reject(response)
                    } else {
                        resolve(response)
                    }
                })
        })
    },
    
    updateUserPassword: async (pass, phn_no) => {
        try {
            return userSchema.updateOne({ phn_no: Number(phn_no) },{
                $set: {
                    password: pass
                }
            }).then(res => {
                if(res.modifiedCount === 1 ) return true
                return false
            })
        } catch(err) {
            console.log(err)
            return Promise.reject(false)
        }
    },

    getUser: checkUser,
}