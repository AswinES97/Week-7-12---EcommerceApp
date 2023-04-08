const bcrypt = require('bcrypt')

module.exports = {
    hashPassword: async (password)=>{
        return bcrypt.hash(password, saltRounds).then(function(hash) {
            return hash
        });
    },

    checkPassword: (password,hash)=>{
        return bcrypt.compare(password, hash).then(function(result) {
            return result
        });
    }
}