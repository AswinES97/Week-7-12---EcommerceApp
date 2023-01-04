const express = require('express')
const path = require('path')
const morgan = require('morgan')
const app = express()
const api = require('./router/api')

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "..", "public")))

app.use('/v1', api)
app.use('/*', (req, res) => {
    res.status(404).json({ "err": "Wrong Path!" })
})

module.exports = app