require('dotenv').config()
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFYSID;
const client = require("twilio")(accountSid, authToken);

let login_phn_no = ''
let create_user_phn_no = ''

async function otpSend(phn_no) {
    let bool = ''
    await client.verify.v2
        .services(verifySid)
        .verifications
        .create({ to: `+91${phn_no}`, channel: "sms" })
        .then((verification) => {
            if (verification.status == 'pending') {
                bool = true
            }
            else {
                bool = false
            }
        })
    return bool
}

async function otpVerify(otpCode, phn_no) {
    if (stage == 'signIn') {
        let bool = ''
        await client.verify.v2
            .services(verifySid)
            .verificationChecks.create({ to: phn_no, code: otpCode })
            .then((verification_check) => {
                if (verification_check.status == 'approved') {
                    bool = true
                }
                if (verification_check.status == "pending") {
                    bool = false
                }
            })
    }
    return bool
}

module.exports = {

    sentOtp: (userData) => {
        if (userData.phn_no) {
            login_phn_no = `+91${userData.phn_no}`
            return new Promise(async (resolve, reject) => {
                const status = await otpSend(userData.phn_no)
                if (status)
                    resolve(true)
                reject(false)
            })
        } else {
            create_user_phn_no = `+91${userData}`
            return new Promise(async (resolve, reject) => {
                const status = await otpSend(userData)
                if (status)
                    resolve(true)
                reject(false)
            })
        }
    },

    verifyOtp: (otpCode, stage) => {
        return new Promise(async (resolve, reject) => {
            console.log(stage);
            let status = ''
            if (this.stage == 'signIn') {
                status = await otpVerify(otpCode,login_phn_no)
            }
            if (this.stage == 'signUp'){
                status = await otpVerify(otpCode,create_user_phn_no)
            }
            if (status)
                resolve(true)
            reject(false)
        })

    }
}