const { getSingleProduct } = require("../models/products.model")

module.exports = {
    getSingleProductPage: async (req, res) => {
        const pId = req.query.pId
        const user = req.user
        console.log(pId);
        getSingleProduct(pId)
            .then(product => {
                return res.render('singleproductpage', {
                    product: product,
                    userStatus: user.loggedIn,
                    userName: user.name,
                    userId: user.userId
                })
            })
            .catch(err => {
                return res.status(400).json({ 'err': 'not able to get data' })
            })
    }
}