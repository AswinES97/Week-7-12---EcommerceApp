const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
    },
    lname: {
        type: String,
    },
    gender: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    phn_no: {
        type: Number,
        required: true
    },
    access: {
        type: Boolean,
        required: true
    }
    
})

module.exports = mongoose.model('User',userSchema)