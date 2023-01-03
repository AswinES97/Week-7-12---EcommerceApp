const http = require('http')
const app = require('../src/app');
const { mongoConnect } = require('../src/services/mongo');
require('dotenv').config()
const PORT = process.env.PORT || 8000;
const server = http.createServer(app)

async function startServer(){
    await mongoConnect()
    server.listen(PORT,(err)=>{
        if(err)
            return console.log(err);
        console.log(`Server listining on http://localhost:${PORT}`);
    })
}

startServer()