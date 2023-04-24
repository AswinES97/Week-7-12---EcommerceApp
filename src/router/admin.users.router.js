const adminUsersRouter = require('express').Router()
const {
    httpGetAllUsers,
    httpUserAccess
} = require('../controller/admin.users.controller')


adminUsersRouter.route('/')
    .get(httpGetAllUsers)

adminUsersRouter.route('/access')
    .patch(httpUserAccess)

module.exports = adminUsersRouter