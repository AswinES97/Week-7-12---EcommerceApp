const { httpSearchController } = require('../controller/search.controller')

const searchRouter = require('express').Router()
 
searchRouter.route('/')
    .get(httpSearchController)

module.exports = searchRouter