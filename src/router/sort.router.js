const { httpNewAdded } = require('../controller/newAdded.controller')

const sortRouter = require('express').Router()

sortRouter.get('/new-added',httpNewAdded)

module.exports = sortRouter