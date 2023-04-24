const mongoose = require('mongoose')

mongoose.connection.once('open',()=>{
    console.log('Mongo is now Connected');
})

mongoose.connection.on('error',(err)=>{
    console.log('Mongo Connection Error :',err);
})

mongoose.set('strictQuery', true)

async function mongoConnect(){
    await mongoose.connect(process.env.MONGO_URL)
}

module.exports = {
    mongoConnect
}