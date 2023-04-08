const {
    getAllUsers,
    userAccess
} = require("../models/admin.model")

module.exports = {
    httpGetAllUsers: async (req, res) => {
        await getAllUsers()
            .then(data => {
                return res.render('admin/admin-user-list',{
                    layout:'admin/admin-layout',
                    adminTrue:req.session.admin ,
                    data
                })
            })
            .catch(err => {
                return res.status(404).json({ 'err': 'No users found' })
            })
    },

    httpUserAccess: async (req, res) => {
        let { userId, access } = req.query
        if (userId) {
            await userAccess(userId, access)
            .then((access)=>{
                return res.status(200).json({'access':access})
            })
        }
        else
            return res.status(400).json({'400':'id not found'})
    }
}