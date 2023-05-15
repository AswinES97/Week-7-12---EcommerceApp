const { httpAdminPagination } = require('../controller/admin.pagination.controller')

const adminPagination = require('express').Router()

adminPagination.route('/')
    .get(httpAdminPagination)

module.exports = adminPagination