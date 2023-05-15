const { httpPaginationController } = require('../controller/user.pagination.controller')

const paginationRouter = require('express').Router()

paginationRouter.route('/')
    .get(httpPaginationController)

module.exports = paginationRouter