const jwt = require('jsonwebtoken')

const createAuthToken =  (data) =>{
    return  jwt.sign({data}, process.env.JWT_SECRET_KEY, { expiresIn: '12h' })
}

module.exports = {
    createAuthToken: createAuthToken
}