const { httpNewAdded , httpPopularProducts } = require('../controller/sort.controller')

const sortRouter = require('express').Router()

sortRouter.get('/new-added',httpNewAdded)
sortRouter.get('/popular',httpPopularProducts)

module.exports = sortRouter