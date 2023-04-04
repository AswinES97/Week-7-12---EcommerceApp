const { 
    addNewAddress,
    getAllAddress
} = require("../../../models/address.model")

module.exports = {
    httpGetAllAddress: (req, res) => {
        getAllAddress(req.session.userId)
        .then(response=>res.json({'ok':response}))
        .catch(err=>res.status(400).json({'err':err}))
    },

    httpAddNewAddress: (req, res) => {
        const { address } = req.body
        if (!userId || address.length === 0) return res.status(400).json({ 'err': 'Address not updated!' })
        else {
            return addNewAddress(address, req.session.userId)
                .then(response =>res.json({'ok': response}))
                .catch(err => res.status(400).json({ 'err': err }))
        }
    },

}