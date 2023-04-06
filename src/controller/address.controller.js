const {
    addNewAddress,
    getAllAddress,
    getSingleAddress,
    updateAddress,
    deleteaddress
} = require("../models/address.model")

module.exports = {
    httpGetAllAddress: (req, res) => {
        getAllAddress(req.session.userId)
            .then(response => res.json({ 'ok': response }))
            .catch(err => res.status(400).json({ 'err': err }))
    },

    httpGetSingleAddress: (req, res) => {
        if (!req.session.userId || !req.params.id) return res.status(400).json({ 'err': 'No address found' })
        else {
            return getSingleAddress(req.session.userId, req.params.id)
                .then(response => res.json({ 'ok': response }))
                .catch(err => res.status(400).json({ 'err': err }))
        }
    },

    httpAddNewAddress: (req, res) => {

        if (!req.session.userId || Object.keys(req.body).length === 0) return res.status(400).json({ 'err': 'Address not updated!' })
        else {
            return addNewAddress(req.body, req.session.userId)
                .then(response => res.json({ 'ok': response }))
                .catch(err => res.status(400).json({ 'err': err }))
        }
    },

    httpUpdateAddress: (req, res) => {
        if (!req.session.userId || Object.keys(req.body).length === 0) return res.status(400).json({ 'err': 'Credential not correct' })
        else updateAddress(req.session.userId, req.body)
            .then(response => {
                return getSingleAddress(req.session.userId, response)
                    .then(response => res.json({ 'ok': response }))
            })
            .catch(err => res.status(400).json({ 'err': err }))
    },

    httpDeleteAddress: (req, res) => {
        deleteaddress(req.session.userId, req.params.id)
        .then(response=>res.json({'ok':response}))
        .catch(err=>res.json({'err':err}))
    }
}