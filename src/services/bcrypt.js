const bcrypt = require('bcrypt')

module.exports = {
    hashPassword: (password)=>{
        return bcrypt.hash(password, 10).then(function(hash) {
            return hash
        });
    },

    checkPassword: (password,hash)=>{
        return bcrypt.compare(password, hash).then(function(result) {
            return result
        });
    }
}