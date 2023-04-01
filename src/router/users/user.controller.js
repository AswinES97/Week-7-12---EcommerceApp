const { getAllProducts } = require("../../models/products.model")
const {
    loginUserWithPhone,
    loginUserWithEmailAndPassword,
    addNewUser,
    getUserForVeri,
    getUser
} = require("../../models/user.model")
const {
    sentOtp,
    verifyOtp
} = require("../../services/otp.service")

const {
    err_user,
    err_blocked,
    err_otpNotSent,
    otp_sent,
    err_email
} = require('../../services/responses')

module.exports = {


    httpsentOtpToUser: async (req, res) => {

        if (req.body.phn_no) {
            await loginUserWithPhone(req.body.phn_no)
                .then(async response => {
                    if (response.access) {
                        await sentOtp(response)
                            .then(response => {
                                return res.status(200).json({ otp_sent })
                            })
                            .catch(err => {
                                return res.status(400).json({ err_otpNotSent })
                            })
                    } else {
                        res.status(400).json({ err_blocked })
                    }
                })
                .catch(err => {
                    return res.status(400).json({ err_user })
                })
        }
        else
            return res.status(400).json({ 'err': 'Invalid Mobile Number!' })

    },

    httpOtpVerify: async (req, res) => {

        if (req.body.otpCode && req.body.phn_no) {
            await verifyOtp(req.body.otpCode, req.body.phn_no)
                .then(async response => {
                    return await getUser(req.body.phn_no, null)
                        .then((data) => {
                            req.session.user = true
                            req.session.userId = data._id
                            req.session.userName = data.fname
                            return res.json({ 'ok': 'Logged In!' })
                        })
                })
                .catch(err => {
                    return res.status(400).json({ 'err': 'Invalid Otp!' })
                })
        }
        else {
            return res.status(400).json({ 'err': 'Invalid Credentials!' })
        }
    },

    httpEmailVerify: async (req, res) => {

        if (req.body.email && req.body.pass)
            await loginUserWithEmailAndPassword(req.body)
                .then(response => {
                    if (response.access) {
                        req.session.user = true
                        req.session.userId = response._id
                        req.session.userName = response.fname

                        return res.status(200).json({ 'ok': 'loggedIn' })
                    } else {
                        res.status(400).json({ err_blocked })
                    }

                })
                .catch(err => {
                    return res.status(404).json({ err_email })
                })
        else
            return res.status(400).json({ 'err': 'No email' })
    },

    httpAddNewUserEmailOtp: async (req, res) => {

        if (req.body.phn_no && req.body.email) {
            await getUserForVeri(req.body.phn_no, req.body.email)
                .then(async () => {
                    await sentOtp(req.body.phn_no)
                        .then(() => {
                            return res.status(201).json({ 'ok': 'otp sent' })
                        })
                        .catch(() => {
                            return res.status(400).json({ '400': "otp not sent" })
                        })

                })
                .catch(data => {
                    if (data.email == req.body.email) {
                        return res.status(400).json({ 'err': 'email exists' })
                    } else if (data.phn_no == req.body.phn_no) {
                        return res.status(400).json({ 'err': 'phn_no exists' })
                    }
                })

        } else
            res.status(400).json({ 'err': 'invalid Credentials' })
    },

    httpAddNewUserVerifyOtp: async (req, res) => {

        if (req.body.otpCode && req.body.phn_no && req.body.email && req.body.name && req.body.password) {
            await verifyOtp(req.body.otpCode, req.body.phn_no)
                .then(async () => {
                    await addNewUser(req.body.phn_no, req.body.email, req.body.name, req.body.password)
                        .then((response) => {
                            req.session.user = true
                            req.session.userId = response._id
                            req.session.userName = response.fname

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
    ,
    httpUserHomepage: async (req, res) => {
        let product = await getAllProducts()
        return await getUser(null, req.session.userId)
            .then((data) => {

                return res.render('homepage', {
                    userStatus: req.session.user,
                    userName: data.fname,
                    userId: data._id,
                    product
                })

            })
    },

    httpUserLogout: (req, res) => {
        req.session.user = null
        return res.redirect('/')
    }
}