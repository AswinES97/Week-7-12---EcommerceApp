const {
    loginUserWithPhone,
    loginUserWithEmailAndPassword,
    addNewUser
} = require("../../models/user.model")
const {
    sentOtp,
    verifyOtp
} = require("../../services/otp.service")

module.exports = {

    httpLoadUserLoginpage: (req, res) => {
        return res.status(200).json({ 'page': 'User Homepage' })
    },

    httpsentOtpToUser: async (req, res) => {
        if (req.body.phn_no) {
            await loginUserWithPhone(req.body.phn_no)
                .then(async response => {
                    await sentOtp(response)
                        .then(response => {
                            return res.status(200).json({ 'ok': 'otp sent' })
                        })
                        .catch(err => {
                            return res.status(400).json({ '400': 'otp not sent' })
                        })
                })
                .catch(err => {
                    return res.status(404).json({ 'err': 'No phn_no found' })
                })
        }
        else
            return res.status(400).json({ '400': 'invalid phn no' })

    },

    httpOtpVerify: async (req, res) => {

        if (req.body.otpCode) {
            await verifyOtp(req.body.otpCode, 'signIn')
                .then(response => {
                    return res.status(200).json({ 'ok': 'Logged In' })
                })
                .catch(err => {
                    return res.status(400).json({ '400': 'wrong otp' })
                })
        }
        else {
            return res.status(400).json({ '400': 'invalide otp' })
        }
    },

    httpEmailVerify: async (req, res) => {
        if (req.body.email)
            await loginUserWithEmailAndPassword(req.body)
                .then(response => {
                    return res.status(200).json({ response })
                })
                .catch(err => {
                    return res.status(404).json({ 'err': 'No User found' })
                })
        else
            return res.status(400).json({ '400': 'No email' })
    },

    httpAddNewUserOtp: async (req, res) => {

        if (req.body.phn_no) {
            await sentOtp(req.body.phn_no)
                .then(() => {
                    return res.status(201).json({ 'ok': 'otp sent' })
                })
                .catch(() => {
                    return res.status(400).json({ '400': "otp not sent" })
                })

        } else
            res.status(400).json({ '400': 'invalid Credentials' })
    },

    httpAddNewUserVerifyOtp: async (req, res) => {
        if (req.body.otpCode) {
            await verifyOtp(req.body.otpCode, 'signUp')
                .then(async () => {
                    await addNewUser(req.body.phn_no)
                        .then(() => {
                            return res.status(201).json({ 'ok': 'user created' })
                        })
                        .catch(() => {
                            return res.status(400).json({ '400': "user not created" })
                        })

                })
                .catch(() => {
                    return res.status(400).json({ '400': "user not created" })
                })
        }
        else {
            return res.status(400).json({ '400': 'invalide otp' })
        }

    }
}