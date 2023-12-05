
const dbUrl = process.env.MONGODB_URL
const mongoose =require('mongoose')

const connectToMongoDb=  ()=>{
    mongoose.connect(dbUrl).then(()=>{
        console.log('connected to mongodb')
    }).catch((error)=>{
        console.log(error)
    })
}


module.exports=connectToMongoDb;