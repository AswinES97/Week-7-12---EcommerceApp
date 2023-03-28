const { addToCart } = require("../../../models/cart.model")

module.exports = {
    httpUserCart: (req, res) => {
        const userName = req.query.name
        const userId = req.query.id
        return res.render('users/cart', {
            userStatus: req.session.user,
            userName,
            userId
        })
    },

    httpAddToCart: async(req, res) => {
        const { userId, pId, quantity, subTotal, grandTotal } = req.body
        if(userId && pId && quantity && subTotal && grandTotal) {
            await addToCart(req.body)
                .then(response=>{
                    return res.json({"ok":'Proudct Added!'})
                })
                .catch(err=>{
                    return res.status(400).json({'err':'Not Added!'})
                })
        }
        else if(userId && pId ){
            const data ={
                userId,
                pId,
                qu
            }
        }
    }

}