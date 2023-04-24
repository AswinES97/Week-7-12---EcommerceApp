const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => console.error(err))
client.connect()

const saveToken = async (token, data) => {
    console.log('here');
    await client.setEx(token, 86400, JSON.stringify(data))
}

const verifyToken = async (token) => {
    let data
    data = await client.get(token)
    console.log(data);
    return JSON.parse(data)
}

const deleteToken = async(token)=> {
    await client.del(token)
}

// generate orderId

const generateOrderId = async ()=>{
    const orderId = await client.get('orderId')
    if(!orderId){
        await client.set('orderId',10001)
        return 10001
    }else{
        return await client.incr('orderId')
    }
}

module.exports = {
    saveToken: saveToken,
    verifyToken: verifyToken,
    deleteToken: deleteToken,
    generateOrderId: generateOrderId
}