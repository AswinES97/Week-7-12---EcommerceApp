const {
    addNewAddress,
    getAllAddress,
    getSingleAddress,
    updateAddress,
    deleteaddress
} = require("../models/address.model")

module.exports = {
    httpGetAllAddress: (req, res) => {
        getAllAddress(req.user.userId)
            .then(response => res.json({ 'ok': response }))
            .catch(err => res.status(400).json({ 'err': err }))
    },

    httpGetSingleAddress: (req, res) => {
        if (!req.user.userId || !req.params.id) return res.status(400).json({ 'err': 'No address found' })
        else {
            return getSingleAddress(req.user.userId, req.params.id)
                .then(response => res.json({ 'ok': response }))
                .catch(err => res.status(400).json({ 'err': err }))
        }
    },

    httpAddNewAddress: (req, res) => {

        if (!req.user.userId || Object.keys(req.body).length === 0) return res.status(400).json({ 'err': 'Address not updated!' })
        else {
            return addNewAddress(req.body, req.user.userId)
                .then(response => res.json({ 'ok': response }))
                .catch(err => res.status(400).json({ 'err': err }))
        }
    },

    httpUpdateAddress: (req, res) => {
        if (!req.user.userId || Object.keys(req.body).length === 0) return res.status(400).json({ 'err': 'Credential not correct' })
        else updateAddress(req.user.userId, req.body)
            .then(response => {
                return getSingleAddress(req.user.userId, response)
                    .then(response => res.json({ 'ok': response }))
            })
            .catch(err => res.status(400).json({ 'err': err }))
    },

    httpDeleteAddress: (req, res) => {
        deleteaddress(req.user.userId, req.params.id)
            .then(response => res.json({ 'ok': response }))
            .catch(err => res.json({ 'err': err }))
    }
}