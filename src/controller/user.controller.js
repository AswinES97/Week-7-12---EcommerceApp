const { getAllProducts } = require("../models/products.model")
const { cartCount } = require('../models/cart.model')
const {
    loginUserWithPhone,
    loginUserWithEmailAndPassword,
    addNewUser,
    getUserForVeri,
    getUser
} = require("../models/user.model")
const { createAuthToken } = require("../services/jwt")
const {
    sentOtp,
    verifyOtp
} = require("../services/otp.service")
const { saveToken, verifyToken, deleteToken } = require("../services/redis")

const {
    err_user,
    err_blocked,
    err_otpNotSent,
    otp_sent,
    err_email
} = require('../services/responses')
const { wishlistCount } = require("../models/wishlist.model")

module.exports = {

    // otp login
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
        let token
        let data
        if (req.body.otpCode && req.body.phn_no) {
            await verifyOtp(req.body.otpCode, req.body.phn_no)
                .then(async response => {
                    return await getUser(req.body.phn_no, null)
                        .then(async (data) => {
                            data = {
                                email: data.email,
                                name: data.fname
                            }
                            token = await createAuthToken(data.userId)
                            await saveToken(token, data)

                            req.session.user = true
                            req.session.userId = data.userId
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
        let data
        let token
        let cartC
        let wishlistC

        if (req.body.email && req.body.pass)
            await loginUserWithEmailAndPassword(req.body)
                .then(async response => {
                    if (response.access) {
                        cartC = await cartCount(response.userId)
                        wishlistC = await wishlistCount(response.userId)
                        data = {
                            email: response.email,
                            name: response.fname,
                            userId: response.userId,
                            cartC: cartC,
                            wishlistC: wishlistC,
                            loggedIn: true
                        }
                        token = await createAuthToken(response.userId)
                        await saveToken(token, data)
                        const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
                        const cookieOptions = {
                            httpOnly: true,
                            expires: expiryDate,
                        };

                        return res.cookie('token', token, cookieOptions).json({ 'ok': 'loggedIn' })
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

    // sent otp
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
        let token
        let data
        if (req.body.otpCode && req.body.phn_no && req.body.email && req.body.name && req.body.password) {
            await verifyOtp(req.body.otpCode, req.body.phn_no)
                .then(async () => {
                    await addNewUser(req.body.phn_no, req.body.email, req.body.name, req.body.password)
                        .then(async (response) => {
                            data = {
                                email: response.email,
                                name: response.fname,
                                userId: response.userId,
                                loggedIn: true
                            }
                            token = await createAuthToken(response.userId)
                            await saveToken(token, data)

                            req.session.user = true
                            req.session.userId = response.userId
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
        const user = req.user
        let product = await getAllProducts()
        return await getUser(null, user.userId)
            .then((data) => {
                return res.render('homepage', {
                    userStatus: user.loggedIn,
                    userName: data.fname,
                    userId: data.userId,
                    product: product,
                    cartCount: user.cartC,
                    wishlistCount: user.wishlistC
                })

            })
    },

    httpUserLogout: async (req, res) => {
        const token = req.cookies.token
        await deleteToken(token)
        res.clearCookie('token')
        return res.redirect('/')
    }
}