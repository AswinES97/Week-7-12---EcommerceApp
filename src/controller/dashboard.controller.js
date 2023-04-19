const { getUser } = require("../models/user.model")

module.exports = {
    httpGetDashboardPage: (req, res) => {
        const user = req.user
        res.render('users/dashboard', {
            userName: user.name,
            userId: user.userId,
            userStatus: user.loggedIn
        })
    }
    ,
    httpUserDetails: async (req, res) => {
        const userId = req.user.userId
        return await getUser(null, userId)
            .then(response => {
                return res.json({ ok: true, fname: response.fname, lname: response.lname, email: response.email, phn_no: response.phn_no })
            })
            .catch(err => {
                return res.status(400).json({ ok: false, data: "Error fetching UserInfo" })
            })
    }
}