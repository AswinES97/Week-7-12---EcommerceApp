const { getAdminDetails } = require("../../models/admin.model")

module.exports = {
    httpGetAdminDetails: async (req, res) => {
        await getAdminDetails(req.body)
            .then(response => {
                return res.status(200).json({response})
            })
            .catch(err=>{
                return res.status(404).json({'err': 'No Admin found'})
            })
    }
}