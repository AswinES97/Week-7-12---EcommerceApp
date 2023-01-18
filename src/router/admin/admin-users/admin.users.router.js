const {
    httpGetAllUsers,
    httpUserAccess
} = require('./admin.users.controller')

const adminUsersRouter = require('express').Router()

adminUsersRouter.route('/')
    .get(httpGetAllUsers)

adminUsersRouter.route('/access')
    .patch(httpUserAccess)

module.exports = adminUsersRouter