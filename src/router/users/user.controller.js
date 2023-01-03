const {
    loginUserWithPhone,
    loginUserWithEmailAndPassword,
    addNewUser
} = require("../../models/user.model")
const { sentOtp } = require("../../services/otp.service")

module.exports = {

    loadUserLoginpage: (req, res) => {
        return res.status(200).json({ 'page': 'User Homepage' })
    },

    httpLoginUser: async (req, res) => {

        if (!req.body.email && !req.body.phn_no) {
            return res.status(404).json({ '400': 'invalid Credentials' })
        }

        if (req.body.phn_no) {
            await loginUserWithPhone(req.body.phn_no)
                .then(response => {
                    return res.status(200).json({ response })
                })
                .catch(err => {
                    return res.status(404).json({ 'err': 'No User found' })
                })
        }
        else if (req.body.email) {
            await loginUserWithEmailAndPassword(req.body)
                .then(response => {
                    return res.status(200).json({ response })
                })
                .catch(err => {
                    return res.status(404).json({ 'err': 'No User found' })
                })
        }
    },

    httpAddNewUser: async (req, res) => {

        if (req.body.phn_no) {
            await sentOtp(phn_no)
            await addNewUser(req.body.phn_no)
                .then(() => {
                    return res.status(201).json({ 'ok': 'user created' })
                })
                .catch(() => {
                    return res.status(400).json({ '400': "user not created" })
                })
        } else
            res.status(400).json({ '400': 'invalid Credentials' })
    }
}