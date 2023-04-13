const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => console.error(err))

const saveToken = async (token, data) => {
    await client.connect()
    await client.set(token, JSON.stringify(data), 'EX', 86400)
    await client.quit()
}

const verifyToken = async (token) => {
    let data
    await client.connect()
    data = await client.get(token)
    await client.quit()
    return JSON.parse(data)
}

const deleteToken = async(token)=> {
    await client.connect()
    await client.del(token)
    await client.quit()
}

module.exports = {
    saveToken: saveToken,
    verifyToken: verifyToken,
    deleteToken: deleteToken
}