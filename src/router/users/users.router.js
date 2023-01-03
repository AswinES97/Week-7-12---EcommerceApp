const express = require('express')
const userRouter = express.Router()

userRouter.route('/')
    .get((req,res)=>{
        res.status(200).json({'success':'Logged In'})  
    })

module.exports = {
    userRouter
}