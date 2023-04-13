const {
    getAdminDetails,
    getAllUsers
} = require("../models/admin.model")
const { checkPassword } = require("../services/bcrypt")
const { createAuthToken } = require("../services/jwt")
const { saveToken } = require("../services/redis")

module.exports = {
    httpGetAdminDetails: async (req, res) => {
        let token
        let passwordBool
        let expiryDate

        const admin = await getAdminDetails(req.body)
        if (admin) {
            passwordBool = await checkPassword(req.body.password, admin.password)
            if (passwordBool) {
                token = createAuthToken(admin.email)
                await saveToken(token, { admin: true })
                expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
                res.cookie('admin_token',token,expiryDate)
                return res.redirect('/v1/admin/')
            }
        }
        return res.status(404).json({ 'err': 'No Admin found' })
    },




}