module.exports = {
    httpOrderPage: (req, res) => {
        return res.render('order', {
            userStatus: req.session.user,
            userId: req.session.userId,
            userName: req.query.userName
        })
    },
    httpNewOrder: (req, res) => {
        console.log(req.body);
    }
}