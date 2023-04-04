module.exports = {
    httpGetDashboardPage: (req, res) => {
        res.render('users/dashboard', {
            userName: req.query.userName,
            userId: req.session.userId,
            userStatus: req.session.user
        })
    }
}