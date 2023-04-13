const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => console.error(err))
client.connect()

const saveToken = async (token, data) => {
    await client.set(token, JSON.stringify(data), 'EX', 86400)
}

const verifyToken = async (token) => {
    let data
    data = await client.get(token)
    return JSON.parse(data)
}

const deleteToken = async(token)=> {
    await client.del(token)
}

module.exports = {
    saveToken: saveToken,
    verifyToken: verifyToken,
    deleteToken: deleteToken
}