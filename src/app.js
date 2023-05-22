const path = require('path')
const uuid = require('uuid')
const express = require('express')
const cors = require('cors')
const nocache = require('nocache')
const morgan = require('morgan')
const session = require('express-session')
const ejsLayout = require('express-ejs-layouts')
const cloudinary = require('cloudinary').v2;
const compression = require('compression')



const api = require('./router/api')
const { userNotLoggedIn } = require('./middleware/session')
const { getAllProducts, productCount } = require('./models/products.model')
const cookieParser = require('cookie-parser')
const { getAllActiveBanner } = require('./models/banner.model')
const app = express()


app.use(compression())
app.use(nocache())
app.use(cors({
    origin: '*'
}))
app.use(cookieParser());
app.use(session({
    genid: (req) => uuid.v4(),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000
    }
}))


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});



app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '..', 'views'))
app.use(ejsLayout)
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "..", "public")))


app.get('/', userNotLoggedIn, async (req, res) => {
    let hasBanner = true
    const pCount = await productCount()
    const banner = await getAllActiveBanner()
    const count = Math.ceil(productCount / 10)
    if(banner.length === 0) hasBanner = false
    
    await getAllProducts()
        .then(response => {
            return res.render('homepage', {
                userStatus: req.session.user,
                product: response,
                productCount: pCount,
                count: count,
                hasBanner: hasBanner,
                banner: banner
            })
        })
        .catch(err => res.render('homepage', { userStatus: req.session.user }))
})

app.use('/v1', api)
app.use('/*', (req, res) => {
    res.status(404).json({ "err": "Wrong Path!" })
})


module.exports = {
    app,
    express
}