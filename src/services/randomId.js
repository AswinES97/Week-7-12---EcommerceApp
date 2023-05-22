const crypto = require('crypto');

function generateRandomId(length) {
  const byteLength = Math.ceil(length / 2);
  const id = crypto.randomBytes(byteLength).toString('hex').slice(0, length);
  return id;
}

module.exports = generateRandomId