module.exports = {
    httpGetDashboardPage: (req, res) => {
        const user = req.user
        res.render('users/dashboard', {
            userName: user.name,
            userId: user.userId,
            userStatus: user.loggedIn
        })
    }
}