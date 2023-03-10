const path = require('path')
const uuid = require('uuid')
const express = require('express')
const cors = require('cors')
const nocache = require('nocache')
const morgan = require('morgan')
const session = require('express-session')
const ejsLayout = require('express-ejs-layouts')


const api = require('./router/api')
const { userNotLoggedIn } = require('./services/session')
const app = express()


app.use(nocache())
app.use(cors({
    origin:'*'
}))


app.use(session({
    genid:(req)=>uuid.v4(),
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:60*60*1000
    }
}))


app.set('view engine','ejs')
app.set('views', path.join(__dirname,'..','views'))
app.use(ejsLayout)
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "..", "public")))


app.get('/',userNotLoggedIn,(req,res)=>{
    console.log(req.sessionID);
    return res.render('homepage',{userStatus:req.session.user})
})

app.use('/v1', api)
app.use('/*', (req, res) => {
    res.status(404).json({ "err": "Wrong Path!" })
})


module.exports = app