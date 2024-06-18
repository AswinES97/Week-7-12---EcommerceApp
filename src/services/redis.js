const redis = require("redis");
const redisHost = "redis";
// const redisHost = "localhost";
const redisPort = "6379"; // Redis port

// Create a Redis client with the specified host and port
const client = redis.createClient({
  socket: {
    port: redisPort,
    host: redisHost,
  },
});
client.connect();

client.on("error", (err) => console.error(err));

const saveToken = async (token, data) => {
  await client.setEx(token, 86400, JSON.stringify(data));
};

const verifyToken = async (token) => {
  let data;
  data = await client.get(token);
  return JSON.parse(data);
};

const deleteToken = async (token) => {
  await client.del(token);
};

// generate orderId
const generateOrderId = async () => {
  const orderId = await client.get("orderId");
  if (!orderId) {
    await client.set("orderId", 10001);
    return 10001;
  } else {
    return await client.incr("orderId");
  }
};

// update data
const updateRedis = async (token, data) => {
  try {
    const ttl = await client.ttl(token);
    const res = await client.setEx(token, ttl, JSON.stringify(data));
    return Promise.resolve(true);
  } catch (err) {
    console.log(err);
    return Promise.reject(false);
  }
};

module.exports = {
  saveToken: saveToken,
  verifyToken: verifyToken,
  deleteToken: deleteToken,
  updateRedis: updateRedis,
  generateOrderId: generateOrderId,
};
