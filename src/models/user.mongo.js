const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
        unique: true
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
    },
    gender: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phn_no: {
        type: Number,
        required: true
    },
    access: {
        type: Boolean,
        required: true,
        default: true
    }
    
},{versionKey:false})

module.exports = mongoose.model('User',userSchema)