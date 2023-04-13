const { verifyToken } = require("../services/redis")

module.exports = {
    userLoggedIn: async (req, res, next) => {
        const token = req.cookies.token
        let data
        if (!token) return res.redirect('/')
        data = await verifyToken(token)
        if (!data) return res.redirect('/')
        req.user = data
        return next()
    },

    userNotLoggedIn: async (req, res, next) => {
        const token = req.cookies.token
        let data
        if (!token) return next()
        data = await verifyToken(token)
        if (!data) return next()
        return res.redirect('/v1/users')
    },

    productUserCheck: async (req, res, next) => {
        const token = req.cookies.token
        if (token) {
            data = await verifyToken(token)
            req.user = data
        } else req.user.loggedIn = false
        next()
    },

    adminNotLoggedIn: async(req, res, next) => {
        const adminToken = req.cookies.admin_token
        let data 
        if (!adminToken) return res.redirect('/v1/admin/admin-login')
        data = await verifyToken(adminToken)
        if(!data) return res.redirect('/v1/admin/admin-login')
        req.admin = data.admin
        return next()        
    },

    adminLoggedIn: (req, res, next) => {
        const adminToken = req.cookies.admin_token
        if (adminToken) {
            return res.redirect('/v1/admin/')
        } else {
            req.admin = false
            return next()
        }
    }
}