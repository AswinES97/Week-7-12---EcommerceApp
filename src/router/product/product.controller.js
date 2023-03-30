const { getSingleProduct } = require("../../models/products.model")

module.exports = {
    getSingleProductPage: async(req,res)=>{
        const slug = req.params.slug
        getSingleProduct(slug)
            .then(product => {
                return res.render('singleproductpage',{
                    userStatus: req.session.user,
                    product,
                    userName: req.session.userName,
                    userId: req.session.userId

                })
            })
            .catch(err => {
                return res.status(400).json({'err':'not able to get data'})
            })
    }
}