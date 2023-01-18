const {
    getAdminDetails,
    getAllUsers
} = require("../../models/admin.model")

module.exports = {
    httpGetAdminDetails: async (req, res) => {
        
        await getAdminDetails(req.body)
            .then(response => {
                req.session.admin = true
                return res.redirect('/v1/admin/')
            })
            .catch(err => {
                return res.status(404).json({ 'err': 'No Admin found' })
            })
    },
    
    

}